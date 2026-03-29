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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportService = class ReportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats(branchId) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const [activeLeads, activeStudents, totalGroups, debtors, trialStudents, paidThisMonth, leftActiveGroup, leftAfterTrial,] = await Promise.all([
            this.prisma.lead.count({
                where: { branchId },
            }),
            this.prisma.student.count({
                where: {
                    branchId,
                    isArchived: false,
                    groupEnrollments: {
                        some: { status: 'ACTIVE' },
                    },
                },
            }),
            this.prisma.group.count({
                where: { branchId, status: 'ACTIVE' },
            }),
            this.prisma.student.count({
                where: {
                    branchId,
                    balance: { lt: 0 },
                },
            }),
            this.prisma.groupStudent.count({
                where: {
                    status: 'TRIAL',
                    group: { branchId },
                },
            }),
            this.prisma.payment.count({
                where: {
                    branchId,
                    date: { gte: startOfMonth, lte: endOfMonth },
                },
            }),
            this.prisma.groupStudent.count({
                where: {
                    status: 'LEFT',
                    group: { branchId },
                    endDate: { gte: startOfMonth, lte: endOfMonth },
                },
            }),
            this.prisma.groupStudent.count({
                where: {
                    status: 'LEFT',
                    group: { branchId },
                    endDate: { gte: startOfMonth, lte: endOfMonth },
                    createdAt: { gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) },
                },
            }),
        ]);
        return {
            activeLeads,
            activeStudents,
            totalGroups,
            debtors,
            trialStudents,
            paidThisMonth,
            leftActiveGroup,
            leftAfterTrial,
        };
    }
    async getRevenueChart(branchId, months = 12) {
        const result = [];
        const now = new Date();
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
            const agg = await this.prisma.payment.aggregate({
                where: {
                    branchId,
                    date: { gte: startOfMonth, lte: endOfMonth },
                },
                _sum: { amount: true },
            });
            const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            result.push({
                month: monthStr,
                revenue: Number(agg._sum.amount || 0),
            });
        }
        return result;
    }
    async getConversionReport(branchId, startDate, endDate, source, staffId) {
        const where = { branchId };
        if (startDate)
            where.createdAt = { ...(where.createdAt || {}), gte: new Date(startDate) };
        if (endDate)
            where.createdAt = { ...(where.createdAt || {}), lte: new Date(endDate) };
        if (source)
            where.source = source;
        if (staffId)
            where.assignedToId = staffId;
        const [incoming, waiting, set, paid] = await Promise.all([
            this.prisma.lead.count({ where }),
            this.prisma.lead.count({ where: { ...where, status: 'EXPECTATION' } }),
            this.prisma.lead.count({ where: { ...where, status: 'SET' } }),
            this.prisma.lead.count({
                where: {
                    ...where,
                    student: { isNot: null },
                },
            }),
        ]);
        const attended = await this.prisma.lead.count({
            where: {
                ...where,
                student: {
                    attendances: { some: {} },
                },
            },
        });
        return {
            incoming,
            waiting,
            set,
            attended,
            paid,
            rates: {
                waitingRate: incoming ? Math.round((waiting / incoming) * 100) : 0,
                setRate: incoming ? Math.round((set / incoming) * 100) : 0,
                attendedRate: incoming ? Math.round((attended / incoming) * 100) : 0,
                paidRate: incoming ? Math.round((paid / incoming) * 100) : 0,
            },
        };
    }
    async getStudentsLeft(branchId) {
        const records = await this.prisma.groupStudent.findMany({
            where: {
                status: 'LEFT',
                group: { branchId },
            },
            include: {
                student: {
                    include: {
                        user: { select: { firstName: true, lastName: true, phone: true } },
                    },
                },
                group: { select: { id: true, name: true } },
            },
            orderBy: { endDate: 'desc' },
            take: 100,
        });
        return records.map((r) => ({
            id: r.id,
            studentName: `${r.student.user.firstName} ${r.student.user.lastName || ''}`.trim(),
            phone: r.student.user.phone,
            groupName: r.group.name,
            groupId: r.group.id,
            startDate: r.startDate,
            endDate: r.endDate,
        }));
    }
    async getLogs(branchId, page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.log.findMany({
                include: {
                    user: { select: { firstName: true, lastName: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.log.count(),
        ]);
        return {
            data: data.map((l) => ({
                id: l.id,
                userName: `${l.user.firstName} ${l.user.lastName}`,
                action: l.action,
                entity: l.entity,
                entityId: l.entityId,
                details: l.details,
                createdAt: l.createdAt,
            })),
            total,
            page,
            limit,
        };
    }
    async getConversion() {
        return { message: 'Use GET /reports/conversion with query params' };
    }
    async getAttendance() {
        return { message: 'TODO: implement getAttendance report' };
    }
    async getLeads() {
        return { message: 'TODO: implement getLeads report' };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportService);
//# sourceMappingURL=report.service.js.map