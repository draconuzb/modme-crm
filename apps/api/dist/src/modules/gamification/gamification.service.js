"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamificationService = class GamificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProducts(branchId) {
        return this.prisma.product.findMany({
            where: { branchId, isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createProduct(branchId, dto) {
        return this.prisma.product.create({
            data: {
                branchId,
                name: dto.name,
                description: dto.description,
                image: dto.image,
                coinPrice: dto.coinPrice,
                stock: dto.stock,
            },
        });
    }
    async updateProduct(id, dto) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.product.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.image !== undefined && { image: dto.image }),
                ...(dto.coinPrice !== undefined && { coinPrice: dto.coinPrice }),
                ...(dto.stock !== undefined && { stock: dto.stock }),
            },
        });
    }
    async deleteProduct(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.product.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async getOrders(branchId, query) {
        const { page = 1, limit = 20, search, status, startDate, endDate, } = query;
        const skip = (page - 1) * limit;
        const where = { branchId };
        if (status)
            where.status = status;
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        if (search) {
            where.student = {
                user: {
                    OR: [
                        { firstName: { contains: search, mode: 'insensitive' } },
                        { lastName: { contains: search, mode: 'insensitive' } },
                    ],
                },
            };
        }
        const [data, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    student: {
                        include: {
                            user: { select: { id: true, firstName: true, lastName: true } },
                        },
                    },
                },
            }),
            this.prisma.order.count({ where }),
        ]);
        const productIds = [...new Set(data.map((o) => o.productId))];
        const products = productIds.length
            ? await this.prisma.product.findMany({
                where: { id: { in: productIds } },
                select: { id: true, name: true },
            })
            : [];
        const productMap = new Map(products.map((p) => [p.id, p.name]));
        const enriched = data.map((order) => ({
            ...order,
            productName: productMap.get(order.productId) ?? 'Unknown',
        }));
        return {
            data: enriched,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async createOrder(branchId, dto) {
        const student = await this.prisma.student.findUnique({
            where: { id: dto.studentId },
        });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product || !product.isActive)
            throw new common_1.NotFoundException('Product not found');
        if (student.coins < product.coinPrice) {
            throw new common_1.BadRequestException('Student does not have enough coins');
        }
        if (product.stock <= 0) {
            throw new common_1.BadRequestException('Product is out of stock');
        }
        await Promise.all([
            this.prisma.student.update({
                where: { id: dto.studentId },
                data: { coins: { decrement: product.coinPrice } },
            }),
            this.prisma.product.update({
                where: { id: dto.productId },
                data: { stock: { decrement: 1 } },
            }),
        ]);
        const order = await this.prisma.order.create({
            data: {
                branchId,
                studentId: dto.studentId,
                productId: dto.productId,
                coinAmount: product.coinPrice,
                status: 'PENDING',
            },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true } },
                    },
                },
            },
        });
        return { ...order, productName: product.name };
    }
    async updateOrderStatus(id, status) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (!['PENDING', 'COMPLETED', 'CANCELLED'].includes(status)) {
            throw new common_1.BadRequestException('Invalid status');
        }
        if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
            await Promise.all([
                this.prisma.student.update({
                    where: { id: order.studentId },
                    data: { coins: { increment: order.coinAmount } },
                }),
                this.prisma.product.update({
                    where: { id: order.productId },
                    data: { stock: { increment: 1 } },
                }),
            ]);
        }
        return this.prisma.order.update({
            where: { id },
            data: { status },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true } },
                    },
                },
            },
        });
    }
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map