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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SmsService = class SmsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendSms(studentId, message) {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
            include: { user: { select: { phone: true } } },
        });
        const phone = student?.user?.phone ?? '';
        const record = await this.prisma.smsRecord.create({
            data: {
                studentId,
                phone,
                message,
                status: 'SENT',
            },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, phone: true } },
                    },
                },
            },
        });
        return record;
    }
    async getHistory(branchId, query) {
        const { page = 1, limit = 20, startDate, endDate, studentId, } = query;
        const skip = (page - 1) * limit;
        const where = {
            student: { branchId },
        };
        if (startDate || endDate) {
            where.sentAt = {};
            if (startDate)
                where.sentAt.gte = new Date(startDate);
            if (endDate)
                where.sentAt.lte = new Date(endDate);
        }
        if (studentId)
            where.studentId = studentId;
        const [data, total] = await Promise.all([
            this.prisma.smsRecord.findMany({
                where,
                skip,
                take: limit,
                orderBy: { sentAt: 'desc' },
                include: {
                    student: {
                        include: {
                            user: { select: { id: true, firstName: true, lastName: true, phone: true } },
                        },
                    },
                },
            }),
            this.prisma.smsRecord.count({ where }),
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
    async bulkSend(studentIds, message) {
        const results = await Promise.all(studentIds.map((id) => this.sendSms(id, message)));
        return { sent: results.length, records: results };
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SmsService);
//# sourceMappingURL=sms.service.js.map