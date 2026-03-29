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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RatingService = class RatingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRatings(branchId, startDate, endDate, groupId) {
        const where = {
            student: { branchId },
        };
        if (groupId) {
            where.groupId = groupId;
        }
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        const ratings = await this.prisma.rating.findMany({
            where,
            include: {
                student: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                    },
                },
            },
            orderBy: { score: 'desc' },
        });
        const groupIds = [...new Set(ratings.map((r) => r.groupId))];
        const groups = await this.prisma.group.findMany({
            where: { id: { in: groupIds } },
            select: { id: true, name: true },
        });
        const groupMap = new Map(groups.map((g) => [g.id, g.name]));
        return ratings.map((r) => ({
            id: r.id,
            studentName: `${r.student.user.firstName} ${r.student.user.lastName || ''}`.trim(),
            studentId: r.studentId,
            groupId: r.groupId,
            groupName: groupMap.get(r.groupId) || '',
            score: Number(r.score),
            period: r.period,
            createdAt: r.createdAt,
        }));
    }
    async getChartData(branchId, startDate, endDate) {
        const where = {
            student: { branchId },
        };
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        const ratings = await this.prisma.rating.findMany({
            where,
            include: {
                student: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                    },
                },
            },
            orderBy: { score: 'desc' },
            take: 20,
        });
        return ratings.map((r) => ({
            studentName: `${r.student.user.firstName} ${r.student.user.lastName || ''}`.trim(),
            score: Number(r.score),
            period: r.period,
        }));
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingService);
//# sourceMappingURL=rating.service.js.map