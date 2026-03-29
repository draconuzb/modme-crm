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
exports.ReminderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReminderService = class ReminderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(branchId) {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        const includeRelations = {
            lead: { select: { id: true, firstName: true, phone: true } },
            student: {
                include: {
                    user: { select: { firstName: true, lastName: true, phone: true } },
                },
            },
        };
        const [overdue, today, future] = await Promise.all([
            this.prisma.reminder.findMany({
                where: {
                    branchId,
                    isCompleted: false,
                    dueDate: { lt: todayStart },
                },
                include: includeRelations,
                orderBy: { dueDate: 'asc' },
            }),
            this.prisma.reminder.findMany({
                where: {
                    branchId,
                    isCompleted: false,
                    dueDate: { gte: todayStart, lte: todayEnd },
                },
                include: includeRelations,
                orderBy: { dueDate: 'asc' },
            }),
            this.prisma.reminder.findMany({
                where: {
                    branchId,
                    isCompleted: false,
                    dueDate: { gt: todayEnd },
                },
                include: includeRelations,
                orderBy: { dueDate: 'asc' },
            }),
        ]);
        const format = (items) => items.map((r) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            dueDate: r.dueDate,
            assignedToId: r.assignedToId,
            lead: r.lead
                ? { id: r.lead.id, firstName: r.lead.firstName, phone: r.lead.phone }
                : null,
            student: r.student
                ? {
                    id: r.student.id,
                    firstName: r.student.user.firstName,
                    lastName: r.student.user.lastName,
                    phone: r.student.user.phone,
                }
                : null,
            createdAt: r.createdAt,
        }));
        return {
            overdue: format(overdue),
            today: format(today),
            future: format(future),
        };
    }
    async create(branchId, dto, userId) {
        return this.prisma.reminder.create({
            data: {
                branchId,
                title: dto.title,
                description: dto.description,
                dueDate: new Date(dto.dueDate),
                leadId: dto.leadId,
                studentId: dto.studentId,
                assignedToId: dto.assignedToId,
                createdById: userId,
            },
        });
    }
    async complete(id, note) {
        return this.prisma.reminder.update({
            where: { id },
            data: {
                isCompleted: true,
                completedAt: new Date(),
                completionNote: note,
            },
        });
    }
    async delete(id) {
        return this.prisma.reminder.delete({ where: { id } });
    }
};
exports.ReminderService = ReminderService;
exports.ReminderService = ReminderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReminderService);
//# sourceMappingURL=reminder.service.js.map