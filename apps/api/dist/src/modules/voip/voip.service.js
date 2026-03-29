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
exports.VoipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VoipService = class VoipService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCalls(branchId, query) {
        const { page = 1, limit = 20, startDate, endDate, direction, studentId, } = query;
        const skip = (page - 1) * limit;
        const where = {
            student: { branchId },
        };
        if (startDate || endDate) {
            where.calledAt = {};
            if (startDate)
                where.calledAt.gte = new Date(startDate);
            if (endDate)
                where.calledAt.lte = new Date(endDate);
        }
        if (direction)
            where.direction = direction;
        if (studentId)
            where.studentId = studentId;
        const [data, total] = await Promise.all([
            this.prisma.callRecord.findMany({
                where,
                skip,
                take: limit,
                orderBy: { calledAt: 'desc' },
                include: {
                    student: {
                        include: {
                            user: { select: { id: true, firstName: true, lastName: true, phone: true } },
                        },
                    },
                },
            }),
            this.prisma.callRecord.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async createCall(data) {
        return this.prisma.callRecord.create({
            data: {
                studentId: data.studentId,
                phone: data.phone,
                direction: data.direction,
                duration: data.duration ?? null,
                recordingUrl: data.recordingUrl ?? null,
            },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, phone: true } },
                    },
                },
            },
        });
    }
};
exports.VoipService = VoipService;
exports.VoipService = VoipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VoipService);
//# sourceMappingURL=voip.service.js.map