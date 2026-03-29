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
exports.FormService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FormService = class FormService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(branchId) {
        return this.prisma.form.findMany({
            where: { branchId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const form = await this.prisma.form.findUnique({ where: { id } });
        if (!form)
            throw new common_1.NotFoundException('Form not found');
        return form;
    }
    async create(branchId, dto) {
        return this.prisma.form.create({
            data: {
                branchId,
                title: dto.title,
                fields: dto.fields,
                isActive: dto.isActive ?? true,
            },
        });
    }
    async update(id, dto) {
        return this.prisma.form.update({
            where: { id },
            data: {
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.fields !== undefined && { fields: dto.fields }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
            },
        });
    }
    async delete(id) {
        return this.prisma.form.delete({ where: { id } });
    }
};
exports.FormService = FormService;
exports.FormService = FormService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FormService);
//# sourceMappingURL=form.service.js.map