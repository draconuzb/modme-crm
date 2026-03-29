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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AttendanceService = class AttendanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bulkMark(dto) {
        const date = new Date(dto.date);
        const results = await this.prisma.$transaction(dto.records.map((record) => this.prisma.attendance.upsert({
            where: {
                groupId_studentId_date: {
                    groupId: dto.groupId,
                    studentId: record.studentId,
                    date,
                },
            },
            update: {
                status: record.status,
                note: record.note,
            },
            create: {
                groupId: dto.groupId,
                studentId: record.studentId,
                date,
                status: record.status,
                note: record.note,
            },
        })));
        return { message: 'Attendance marked successfully', count: results.length };
    }
    async getReport(branchId, query) {
        const { page = 1, limit = 20, search, groupId, teacherId, studentId, status, startDate, endDate } = query;
        const skip = (page - 1) * limit;
        const where = {
            group: { branchId },
        };
        if (groupId)
            where.groupId = groupId;
        if (studentId)
            where.studentId = studentId;
        if (status)
            where.status = status;
        if (teacherId)
            where.group = { ...where.group, teacherId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
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
        const [data, total] = await Promise.all([
            this.prisma.attendance.findMany({
                where,
                skip,
                take: limit,
                orderBy: { date: 'desc' },
                include: {
                    student: {
                        include: {
                            user: { select: { firstName: true, lastName: true, phone: true } },
                        },
                    },
                    group: {
                        include: {
                            teacher: {
                                include: {
                                    user: { select: { firstName: true, lastName: true } },
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.attendance.count({ where }),
        ]);
        const items = data.map((a) => ({
            id: a.id,
            studentName: `${a.student.user.firstName} ${a.student.user.lastName}`,
            phone: a.student.user.phone,
            status: a.status,
            groupName: a.group.name,
            teacherName: `${a.group.teacher.user.firstName} ${a.group.teacher.user.lastName}`,
            lessonTime: `${a.group.startTime} - ${a.group.endTime}`,
            date: a.date,
            note: a.note,
        }));
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getStudentAttendance(studentId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const records = await this.prisma.attendance.findMany({
            where: {
                studentId,
                date: { gte: startDate, lte: endDate },
            },
            include: {
                group: { select: { name: true } },
            },
            orderBy: { date: 'asc' },
        });
        return records.map((r) => ({
            id: r.id,
            date: r.date,
            status: r.status,
            groupName: r.group.name,
            note: r.note,
        }));
    }
    async getGroupMonthlyAttendance(groupId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const students = await this.prisma.groupStudent.findMany({
            where: { groupId },
            include: {
                student: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                    },
                },
            },
        });
        const attendances = await this.prisma.attendance.findMany({
            where: {
                groupId,
                date: { gte: startDate, lte: endDate },
            },
        });
        const attendanceMap = new Map();
        for (const a of attendances) {
            const key = `${a.studentId}_${a.date.toISOString().split('T')[0]}`;
            attendanceMap.set(key, a.status);
        }
        const daysInMonth = endDate.getDate();
        const dates = Array.from({ length: daysInMonth }, (_, i) => {
            const d = new Date(year, month - 1, i + 1);
            return d.toISOString().split('T')[0];
        });
        const matrix = students.map((gs) => ({
            studentId: gs.studentId,
            studentName: `${gs.student.user.firstName} ${gs.student.user.lastName}`,
            status: gs.status,
            attendance: dates.reduce((acc, date) => {
                acc[date] = attendanceMap.get(`${gs.studentId}_${date}`) || null;
                return acc;
            }, {}),
        }));
        return { dates, students: matrix };
    }
    async getTeacherAttendance(branchId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const teachers = await this.prisma.teacher.findMany({
            where: {
                user: {
                    branches: { some: { branchId } },
                },
            },
            include: {
                user: { select: { firstName: true, lastName: true } },
            },
        });
        const attendances = await this.prisma.teacherAttendance.findMany({
            where: {
                teacherId: { in: teachers.map((t) => t.id) },
                date: { gte: startDate, lte: endDate },
            },
        });
        const attendanceMap = new Map();
        for (const a of attendances) {
            const key = `${a.teacherId}_${a.date.toISOString().split('T')[0]}`;
            attendanceMap.set(key, { status: a.status, checkIn: a.checkIn, checkOut: a.checkOut });
        }
        const daysInMonth = endDate.getDate();
        const dates = Array.from({ length: daysInMonth }, (_, i) => {
            const d = new Date(year, month - 1, i + 1);
            return d.toISOString().split('T')[0];
        });
        const data = teachers.map((t) => ({
            teacherId: t.id,
            teacherName: `${t.user.firstName} ${t.user.lastName}`,
            attendance: dates.reduce((acc, date) => {
                acc[date] = attendanceMap.get(`${t.id}_${date}`) || null;
                return acc;
            }, {}),
        }));
        return { dates, teachers: data };
    }
    async markTeacherAttendance(dto) {
        const date = new Date(dto.date);
        const result = await this.prisma.teacherAttendance.upsert({
            where: {
                teacherId_date: {
                    teacherId: dto.teacherId,
                    date,
                },
            },
            update: {
                status: dto.status,
                checkIn: dto.checkIn ? new Date(dto.checkIn) : undefined,
                checkOut: dto.checkOut ? new Date(dto.checkOut) : undefined,
            },
            create: {
                teacherId: dto.teacherId,
                date,
                status: dto.status,
                checkIn: dto.checkIn ? new Date(dto.checkIn) : null,
                checkOut: dto.checkOut ? new Date(dto.checkOut) : null,
            },
        });
        return result;
    }
    async getTeacherWorkSchedule(teacherId) {
        return this.prisma.workSchedule.findMany({
            where: { teacherId },
            orderBy: { dayOfWeek: 'asc' },
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map