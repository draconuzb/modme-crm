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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinanceService = class FinanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPayments(branchId, query) {
        const { page = 1, limit = 20, search, sortBy = 'date', sortOrder = 'desc', startDate, endDate, studentId, method, minAmount, maxAmount, createdById, } = query;
        const skip = (page - 1) * limit;
        const where = { branchId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        if (studentId)
            where.studentId = studentId;
        if (method)
            where.method = method;
        if (createdById)
            where.createdById = createdById;
        if (minAmount || maxAmount) {
            where.amount = {};
            if (minAmount)
                where.amount.gte = minAmount;
            if (maxAmount)
                where.amount.lte = maxAmount;
        }
        if (search) {
            where.student = {
                user: {
                    OR: [
                        { firstName: { contains: search, mode: 'insensitive' } },
                        { lastName: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search } },
                    ],
                },
            };
        }
        const [data, total, aggregation] = await Promise.all([
            this.prisma.payment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    student: {
                        include: {
                            user: { select: { id: true, firstName: true, lastName: true, phone: true } },
                        },
                    },
                },
            }),
            this.prisma.payment.count({ where }),
            this.prisma.payment.aggregate({
                where,
                _sum: { amount: true },
            }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            totalAmount: aggregation._sum.amount || 0,
        };
    }
    async createPayment(branchId, dto, userId) {
        const payment = await this.prisma.payment.create({
            data: {
                branchId,
                studentId: dto.studentId,
                amount: dto.amount,
                method: dto.method,
                description: dto.description,
                createdById: userId,
                date: dto.date ? new Date(dto.date) : new Date(),
            },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true } },
                    },
                },
            },
        });
        await this.prisma.student.update({
            where: { id: dto.studentId },
            data: {
                balance: { increment: dto.amount },
            },
        });
        return payment;
    }
    async getPaymentsSummary(branchId, startDate, endDate) {
        const where = { branchId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const totalRevenue = await this.prisma.payment.aggregate({
            where,
            _sum: { amount: true },
        });
        const now = new Date();
        const monthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        const payments = await this.prisma.payment.findMany({
            where: {
                branchId,
                date: { gte: monthsAgo },
            },
            select: { amount: true, date: true },
        });
        const chartData = this.aggregateByMonth(payments);
        return {
            totalRevenue: totalRevenue._sum.amount || 0,
            chartData,
        };
    }
    async getWithdrawals(branchId, query) {
        const { page = 1, limit = 20, sortBy = 'date', sortOrder = 'desc', startDate, endDate, method, minAmount, maxAmount, createdById, } = query;
        const skip = (page - 1) * limit;
        const where = { branchId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        if (method)
            where.method = method;
        if (createdById)
            where.createdById = createdById;
        if (minAmount || maxAmount) {
            where.amount = {};
            if (minAmount)
                where.amount.gte = minAmount;
            if (maxAmount)
                where.amount.lte = maxAmount;
        }
        const [data, total, aggregation] = await Promise.all([
            this.prisma.withdrawal.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            this.prisma.withdrawal.count({ where }),
            this.prisma.withdrawal.aggregate({
                where,
                _sum: { amount: true },
            }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            totalAmount: aggregation._sum.amount || 0,
        };
    }
    async createWithdrawal(branchId, dto, userId) {
        return this.prisma.withdrawal.create({
            data: {
                branchId,
                amount: dto.amount,
                method: dto.method,
                description: dto.description,
                category: dto.category,
                createdById: userId,
                date: dto.date ? new Date(dto.date) : new Date(),
            },
        });
    }
    async getWithdrawalsSummary(branchId, startDate, endDate) {
        const where = { branchId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const totalWithdrawals = await this.prisma.withdrawal.aggregate({
            where,
            _sum: { amount: true },
        });
        const now = new Date();
        const monthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        const withdrawals = await this.prisma.withdrawal.findMany({
            where: {
                branchId,
                date: { gte: monthsAgo },
            },
            select: { amount: true, date: true },
        });
        const chartData = this.aggregateByMonth(withdrawals);
        return {
            totalWithdrawals: totalWithdrawals._sum.amount || 0,
            chartData,
        };
    }
    async getExpenses(branchId, query) {
        const { page = 1, limit = 20, search, sortBy = 'date', sortOrder = 'desc', startDate, endDate, minAmount, maxAmount, } = query;
        const skip = (page - 1) * limit;
        const where = { branchId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        if (minAmount || maxAmount) {
            where.amount = {};
            if (minAmount)
                where.amount.gte = minAmount;
            if (maxAmount)
                where.amount.lte = maxAmount;
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total, aggregation] = await Promise.all([
            this.prisma.expense.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            this.prisma.expense.count({ where }),
            this.prisma.expense.aggregate({
                where,
                _sum: { amount: true },
            }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            totalAmount: aggregation._sum.amount || 0,
        };
    }
    async createExpense(branchId, dto) {
        return this.prisma.expense.create({
            data: {
                branchId,
                title: dto.title,
                amount: dto.amount,
                category: dto.category,
                date: dto.date ? new Date(dto.date) : new Date(),
            },
        });
    }
    async getExpensesSummary(branchId, startDate, endDate) {
        const where = { branchId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const expenses = await this.prisma.expense.findMany({
            where,
            select: { amount: true, category: true },
        });
        const byCategory = {};
        let total = 0;
        for (const e of expenses) {
            const amt = Number(e.amount);
            total += amt;
            byCategory[e.category] = (byCategory[e.category] || 0) + amt;
        }
        return {
            totalExpenses: total,
            byCategory: Object.entries(byCategory).map(([category, amount]) => ({
                category,
                amount,
            })),
        };
    }
    async getSalaries(branchId, month, year) {
        const existing = await this.prisma.salary.findMany({
            where: {
                month,
                year,
                teacher: {
                    groups: {
                        some: { branchId },
                    },
                },
            },
            include: {
                teacher: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                        groups: {
                            where: { branchId, status: 'ACTIVE' },
                            include: {
                                course: { select: { name: true, price: true } },
                                students: { where: { status: 'ACTIVE' } },
                            },
                        },
                    },
                },
            },
        });
        if (existing.length > 0) {
            return this.groupSalariesByTeacher(existing);
        }
        return this.calculateSalariesData(branchId, month, year);
    }
    async calculateSalaries(branchId, month, year) {
        const salaryData = await this.calculateSalariesData(branchId, month, year);
        for (const teacher of salaryData) {
            for (const group of teacher.groups) {
                await this.prisma.salary.upsert({
                    where: {
                        teacherId_groupId_month_year: {
                            teacherId: teacher.teacherId,
                            groupId: group.groupId,
                            month,
                            year,
                        },
                    },
                    create: {
                        teacherId: teacher.teacherId,
                        groupId: group.groupId,
                        month,
                        year,
                        amount: group.amount,
                    },
                    update: {
                        amount: group.amount,
                    },
                });
            }
        }
        return salaryData;
    }
    async paySalary(salaryId) {
        const salary = await this.prisma.salary.findUnique({
            where: { id: salaryId },
            include: {
                teacher: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                        groups: { take: 1 },
                    },
                },
            },
        });
        if (!salary) {
            throw new common_1.NotFoundException('Salary not found');
        }
        const updated = await this.prisma.salary.update({
            where: { id: salaryId },
            data: { isPaid: true, paidAt: new Date() },
        });
        const branchId = salary.teacher.groups[0]?.branchId;
        if (branchId) {
            await this.prisma.withdrawal.create({
                data: {
                    branchId,
                    amount: salary.amount,
                    method: 'TRANSFER',
                    description: `Salary payment: ${salary.teacher.user.firstName} ${salary.teacher.user.lastName} (${salary.month}/${salary.year})`,
                    category: 'SALARY',
                    date: new Date(),
                },
            });
        }
        return updated;
    }
    async getDebtors(branchId, query) {
        const { page = 1, limit = 20, search, sortBy = 'balance', sortOrder = 'asc', minAmount, maxAmount, } = query;
        const skip = (page - 1) * limit;
        const where = {
            branchId,
            isArchived: false,
            balance: { lt: 0 },
        };
        if (minAmount || maxAmount) {
            if (minAmount)
                where.balance.lte = -minAmount;
            if (maxAmount)
                where.balance.gte = -maxAmount;
        }
        if (search) {
            where.user = {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search } },
                ],
            };
        }
        const [data, total] = await Promise.all([
            this.prisma.student.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    user: { select: { id: true, firstName: true, lastName: true, phone: true } },
                    groupEnrollments: {
                        where: { status: 'ACTIVE' },
                        include: {
                            group: {
                                select: { id: true, name: true, course: { select: { name: true } } },
                            },
                        },
                    },
                    payments: {
                        orderBy: { date: 'desc' },
                        take: 1,
                        select: { date: true },
                    },
                },
            }),
            this.prisma.student.count({ where }),
        ]);
        const debtors = data.map((s) => ({
            id: s.id,
            userId: s.user.id,
            studentName: `${s.user.firstName} ${s.user.lastName}`,
            phone: s.user.phone,
            balance: s.balance,
            groups: s.groupEnrollments.map((ge) => ({
                id: ge.group.id,
                name: ge.group.name,
                courseName: ge.group.course.name,
            })),
            lastPaymentDate: s.payments[0]?.date || null,
            note: s.note,
        }));
        return {
            data: debtors,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getFinanceSummary(branchId) {
        const [revenueAgg, withdrawalAgg, expenseAgg] = await Promise.all([
            this.prisma.payment.aggregate({
                where: { branchId },
                _sum: { amount: true },
            }),
            this.prisma.withdrawal.aggregate({
                where: { branchId },
                _sum: { amount: true },
            }),
            this.prisma.expense.aggregate({
                where: { branchId },
                _sum: { amount: true },
            }),
        ]);
        const totalRevenue = Number(revenueAgg._sum.amount || 0);
        const totalWithdrawals = Number(withdrawalAgg._sum.amount || 0);
        const totalExpenses = Number(expenseAgg._sum.amount || 0);
        const netProfit = totalRevenue - totalWithdrawals - totalExpenses;
        const now = new Date();
        const monthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        const [payments, withdrawals, expenses] = await Promise.all([
            this.prisma.payment.findMany({
                where: { branchId, date: { gte: monthsAgo } },
                select: { amount: true, date: true },
            }),
            this.prisma.withdrawal.findMany({
                where: { branchId, date: { gte: monthsAgo } },
                select: { amount: true, date: true },
            }),
            this.prisma.expense.findMany({
                where: { branchId, date: { gte: monthsAgo } },
                select: { amount: true, date: true },
            }),
        ]);
        const revenueByMonth = this.aggregateByMonth(payments);
        const expensesByMonth = this.aggregateByMonth([...withdrawals, ...expenses]);
        const monthKeys = new Set([
            ...revenueByMonth.map((d) => d.month),
            ...expensesByMonth.map((d) => d.month),
        ]);
        const chartData = Array.from(monthKeys)
            .sort()
            .map((month) => ({
            month,
            revenue: revenueByMonth.find((d) => d.month === month)?.amount || 0,
            expenses: expensesByMonth.find((d) => d.month === month)?.amount || 0,
        }));
        return {
            totalRevenue,
            totalWithdrawals,
            totalExpenses,
            netProfit,
            chartData,
        };
    }
    aggregateByMonth(records) {
        const map = {};
        for (const r of records) {
            const d = new Date(r.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            map[key] = (map[key] || 0) + Number(r.amount);
        }
        return Object.entries(map)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, amount]) => ({ month, amount }));
    }
    async calculateSalariesData(branchId, month, year) {
        const teachers = await this.prisma.teacher.findMany({
            where: {
                groups: { some: { branchId, status: 'ACTIVE' } },
            },
            include: {
                user: { select: { firstName: true, lastName: true } },
                groups: {
                    where: { branchId, status: 'ACTIVE' },
                    include: {
                        course: { select: { name: true, price: true } },
                        students: { where: { status: 'ACTIVE' } },
                    },
                },
            },
        });
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);
        const attendanceRecords = await this.prisma.attendance.findMany({
            where: {
                group: { branchId },
                date: { gte: startOfMonth, lte: endOfMonth },
            },
            select: { groupId: true, date: true },
            distinct: ['groupId', 'date'],
        });
        const lessonsByGroup = {};
        for (const a of attendanceRecords) {
            lessonsByGroup[a.groupId] = (lessonsByGroup[a.groupId] || 0) + 1;
        }
        return teachers.map((teacher) => {
            const groups = teacher.groups.map((group) => {
                const students = group.students.length;
                const lessons = lessonsByGroup[group.id] || 0;
                const coursePrice = Number(group.course.price);
                const amount = Math.round((coursePrice / 12) * students * 0.3 * 100) / 100;
                return {
                    groupId: group.id,
                    groupName: group.name,
                    courseName: group.course.name,
                    students,
                    lessons,
                    amount,
                };
            });
            return {
                teacherId: teacher.id,
                teacherName: `${teacher.user.firstName} ${teacher.user.lastName}`,
                groups,
                total: groups.reduce((sum, g) => sum + g.amount, 0),
            };
        });
    }
    groupSalariesByTeacher(salaries) {
        const map = {};
        for (const s of salaries) {
            if (!map[s.teacherId]) {
                map[s.teacherId] = {
                    teacherId: s.teacherId,
                    teacherName: `${s.teacher.user.firstName} ${s.teacher.user.lastName}`,
                    groups: [],
                    total: 0,
                };
            }
            const teacherGroups = s.teacher.groups || [];
            const matchedGroup = teacherGroups.find((g) => g.id === s.groupId);
            map[s.teacherId].groups.push({
                salaryId: s.id,
                groupId: s.groupId,
                groupName: matchedGroup?.name || '—',
                courseName: matchedGroup?.course?.name || '—',
                students: matchedGroup?.students?.length || 0,
                lessons: 0,
                amount: Number(s.amount),
                isPaid: s.isPaid,
                paidAt: s.paidAt,
            });
            map[s.teacherId].total += Number(s.amount);
        }
        return Object.values(map);
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceService);
//# sourceMappingURL=finance.service.js.map