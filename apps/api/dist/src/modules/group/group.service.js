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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GroupService = class GroupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(branchId, query) {
        const { page = 1, limit = 20, search, sortBy, sortOrder = 'desc', courseId, teacherId, dayType, status, tagIds, } = query;
        const skip = (page - 1) * limit;
        const where = {
            branchId,
        };
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        if (courseId) {
            where.courseId = parseInt(courseId, 10);
        }
        if (teacherId) {
            where.teacherId = parseInt(teacherId, 10);
        }
        if (dayType) {
            where.dayType = dayType;
        }
        if (status) {
            where.status = status;
        }
        if (tagIds) {
            const ids = tagIds.split(',').map((s) => parseInt(s, 10));
            where.tags = {
                some: { tagId: { in: ids } },
            };
        }
        const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' };
        const [data, total] = await Promise.all([
            this.prisma.group.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    course: { select: { id: true, name: true } },
                    teacher: {
                        include: {
                            user: {
                                select: { id: true, firstName: true, lastName: true },
                            },
                        },
                    },
                    room: { select: { id: true, name: true } },
                    tags: {
                        include: {
                            tag: { select: { id: true, name: true, color: true } },
                        },
                    },
                    _count: { select: { students: true } },
                },
            }),
            this.prisma.group.count({ where }),
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
        const group = await this.prisma.group.findUnique({
            where: { id },
            include: {
                course: true,
                teacher: {
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
                },
                room: true,
                students: {
                    include: {
                        student: {
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
                        },
                    },
                    orderBy: {
                        student: {
                            user: { firstName: 'asc' },
                        },
                    },
                },
                tags: {
                    include: {
                        tag: { select: { id: true, name: true, color: true } },
                    },
                },
                _count: { select: { students: true } },
            },
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        return group;
    }
    async create(branchId, dto) {
        return this.prisma.group.create({
            data: {
                branchId,
                name: dto.name,
                courseId: dto.courseId,
                teacherId: dto.teacherId,
                roomId: dto.roomId || null,
                dayType: dto.dayType,
                customDays: dto.customDays,
                startTime: dto.startTime,
                endTime: dto.endTime,
                startDate: new Date(dto.startDate),
                capacity: dto.capacity,
                note: dto.note,
            },
            include: {
                course: { select: { id: true, name: true } },
                teacher: {
                    include: {
                        user: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                },
                room: { select: { id: true, name: true } },
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = {};
        if (dto.name !== undefined)
            data.name = dto.name;
        if (dto.courseId !== undefined)
            data.courseId = dto.courseId;
        if (dto.teacherId !== undefined)
            data.teacherId = dto.teacherId;
        if (dto.roomId !== undefined)
            data.roomId = dto.roomId;
        if (dto.dayType !== undefined)
            data.dayType = dto.dayType;
        if (dto.customDays !== undefined)
            data.customDays = dto.customDays;
        if (dto.startTime !== undefined)
            data.startTime = dto.startTime;
        if (dto.endTime !== undefined)
            data.endTime = dto.endTime;
        if (dto.startDate !== undefined)
            data.startDate = new Date(dto.startDate);
        if (dto.capacity !== undefined)
            data.capacity = dto.capacity;
        if (dto.note !== undefined)
            data.note = dto.note;
        if (dto.status !== undefined)
            data.status = dto.status;
        return this.prisma.group.update({
            where: { id },
            data,
            include: {
                course: { select: { id: true, name: true } },
                teacher: {
                    include: {
                        user: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                },
                room: { select: { id: true, name: true } },
            },
        });
    }
    async addStudent(groupId, dto) {
        await this.findOne(groupId);
        return this.prisma.groupStudent.create({
            data: {
                groupId,
                studentId: dto.studentId,
                price: dto.price,
                status: dto.status || 'ACTIVE',
            },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                phone: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async removeStudent(groupId, studentId) {
        const enrollment = await this.prisma.groupStudent.findUnique({
            where: {
                groupId_studentId: { groupId, studentId },
            },
        });
        if (!enrollment) {
            throw new common_1.NotFoundException(`Student ${studentId} not found in group ${groupId}`);
        }
        return this.prisma.groupStudent.update({
            where: {
                groupId_studentId: { groupId, studentId },
            },
            data: {
                status: 'LEFT',
                endDate: new Date(),
            },
        });
    }
    async getAttendance(groupId, month, year) {
        await this.findOne(groupId);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const enrollments = await this.prisma.groupStudent.findMany({
            where: { groupId },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                student: {
                    user: { firstName: 'asc' },
                },
            },
        });
        const attendanceRecords = await this.prisma.attendance.findMany({
            where: {
                groupId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        const attendanceMap = new Map();
        attendanceRecords.forEach((rec) => {
            const dateStr = rec.date.toISOString().split('T')[0];
            attendanceMap.set(`${rec.studentId}-${dateStr}`, rec.status);
        });
        const dateSet = new Set(attendanceRecords.map((a) => a.date.toISOString().split('T')[0]));
        const dates = [...dateSet].sort();
        const students = enrollments.map((e) => {
            const attendance = {};
            dates.forEach((date) => {
                attendance[date] =
                    attendanceMap.get(`${e.studentId}-${date}`) || null;
            });
            return {
                studentId: e.studentId,
                firstName: e.student.user.firstName,
                lastName: e.student.user.lastName,
                status: e.status,
                attendance,
            };
        });
        return {
            dates,
            students,
            daysInMonth: endDate.getDate(),
        };
    }
    async getStudents(groupId) {
        await this.findOne(groupId);
        return this.prisma.groupStudent.findMany({
            where: { groupId },
            include: {
                student: {
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
                },
            },
            orderBy: {
                student: {
                    user: { firstName: 'asc' },
                },
            },
        });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map