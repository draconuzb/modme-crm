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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let StudentService = class StudentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(branchId, query) {
        const { page = 1, limit = 20, search, sortBy, sortOrder = 'desc', courseId, status, financialStatus, tagId, startDate, endDate, } = query;
        const skip = (page - 1) * limit;
        const where = {
            branchId,
            isArchived: false,
        };
        if (search) {
            where.user = {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search } },
                ],
            };
        }
        if (courseId) {
            where.groupEnrollments = {
                some: { group: { courseId } },
            };
        }
        if (status) {
            where.groupEnrollments = {
                ...where.groupEnrollments,
                some: {
                    ...where.groupEnrollments?.some,
                    status,
                },
            };
        }
        if (financialStatus === 'debtor') {
            where.balance = { lt: 0 };
        }
        else if (financialStatus === 'overpaid') {
            where.balance = { gt: 0 };
        }
        else if (financialStatus === 'paid') {
            where.balance = { equals: 0 };
        }
        if (startDate) {
            where.createdAt = { ...where.createdAt, gte: new Date(startDate) };
        }
        if (endDate) {
            where.createdAt = { ...where.createdAt, lte: new Date(endDate) };
        }
        const orderBy = sortBy
            ? { [sortBy]: sortOrder }
            : { createdAt: 'desc' };
        const [data, total] = await Promise.all([
            this.prisma.student.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            phone: true,
                            avatar: true,
                            gender: true,
                            dateOfBirth: true,
                            createdAt: true,
                        },
                    },
                    groupEnrollments: {
                        include: {
                            group: {
                                include: {
                                    course: { select: { id: true, name: true } },
                                    teacher: {
                                        include: {
                                            user: {
                                                select: { id: true, firstName: true, lastName: true },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.student.count({ where }),
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
    async findOne(id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        avatar: true,
                        gender: true,
                        dateOfBirth: true,
                        createdAt: true,
                    },
                },
                groupEnrollments: {
                    include: {
                        group: {
                            include: {
                                course: { select: { id: true, name: true } },
                                teacher: {
                                    include: {
                                        user: {
                                            select: { id: true, firstName: true, lastName: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                lead: true,
            },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }
    async create(branchId, dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName || '',
                phone: dto.phone,
                password: hashedPassword,
                role: 'STUDENT',
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                branches: {
                    create: { branchId },
                },
            },
        });
        const studentData = {
            userId: user.id,
            branchId,
            note: dto.note,
        };
        const student = await this.prisma.student.create({
            data: studentData,
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        avatar: true,
                    },
                },
            },
        });
        if (dto.groupId) {
            const group = await this.prisma.group.findUnique({
                where: { id: dto.groupId },
                include: { course: true },
            });
            const price = dto.price ?? Number(group?.course?.price ?? 0);
            await this.prisma.groupStudent.create({
                data: {
                    groupId: dto.groupId,
                    studentId: student.id,
                    price,
                },
            });
        }
        return student;
    }
    async update(id, dto) {
        const student = await this.findOne(id);
        const userData = {};
        if (dto.firstName !== undefined)
            userData.firstName = dto.firstName;
        if (dto.lastName !== undefined)
            userData.lastName = dto.lastName;
        if (dto.phone !== undefined)
            userData.phone = dto.phone;
        if (dto.gender !== undefined)
            userData.gender = dto.gender;
        if (dto.dateOfBirth !== undefined)
            userData.dateOfBirth = new Date(dto.dateOfBirth);
        if (Object.keys(userData).length > 0) {
            await this.prisma.user.update({
                where: { id: student.userId },
                data: userData,
            });
        }
        const studentData = {};
        if (dto.note !== undefined)
            studentData.note = dto.note;
        if (Object.keys(studentData).length > 0) {
            await this.prisma.student.update({
                where: { id },
                data: studentData,
            });
        }
        return this.findOne(id);
    }
    async getGroups(studentId) {
        await this.findOne(studentId);
        return this.prisma.groupStudent.findMany({
            where: { studentId },
            include: {
                group: {
                    include: {
                        course: { select: { id: true, name: true } },
                        teacher: {
                            include: {
                                user: {
                                    select: { id: true, firstName: true, lastName: true },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getComments(studentId) {
        await this.findOne(studentId);
        return this.prisma.comment.findMany({
            where: { studentId },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true, avatar: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async addComment(studentId, authorId, text) {
        await this.findOne(studentId);
        return this.prisma.comment.create({
            data: {
                studentId,
                authorId,
                text,
            },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true, avatar: true },
                },
            },
        });
    }
    async getCallHistory(studentId) {
        await this.findOne(studentId);
        return this.prisma.callRecord.findMany({
            where: { studentId },
            orderBy: { calledAt: 'desc' },
        });
    }
    async getSmsHistory(studentId) {
        await this.findOne(studentId);
        return this.prisma.smsRecord.findMany({
            where: { studentId },
            orderBy: { sentAt: 'desc' },
        });
    }
    async getHistory(studentId) {
        const student = await this.findOne(studentId);
        return this.prisma.log.findMany({
            where: {
                entity: 'Student',
                entityId: studentId,
            },
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getLeadHistory(studentId) {
        const student = await this.findOne(studentId);
        if (!student.leadId) {
            return null;
        }
        return this.prisma.lead.findUnique({
            where: { id: student.leadId },
            include: {
                tags: {
                    include: { tag: true },
                },
                course: { select: { id: true, name: true } },
                reminders: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    }
    async addPayment(studentId, branchId, dto) {
        await this.findOne(studentId);
        const payment = await this.prisma.payment.create({
            data: {
                branchId,
                studentId,
                amount: dto.amount,
                method: dto.method,
                description: dto.description,
            },
        });
        await this.prisma.student.update({
            where: { id: studentId },
            data: {
                balance: { increment: dto.amount },
            },
        });
        return payment;
    }
    async getBalance(studentId) {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
            select: { balance: true },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        return { balance: student.balance };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentService);
//# sourceMappingURL=student.service.js.map