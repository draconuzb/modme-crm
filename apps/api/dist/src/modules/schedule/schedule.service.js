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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ScheduleService = class ScheduleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSchedule(branchId, dayType) {
        const where = {
            branchId,
            status: 'ACTIVE',
        };
        if (dayType) {
            where.dayType = dayType;
        }
        const groups = await this.prisma.group.findMany({
            where,
            include: {
                course: { select: { name: true } },
                teacher: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                    },
                },
                room: { select: { id: true, name: true } },
                _count: { select: { students: true } },
            },
            orderBy: [{ startTime: 'asc' }],
        });
        const courseColors = new Map();
        const palette = [
            '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1',
            '#13c2c2', '#eb2f96', '#fa8c16', '#a0d911', '#2f54eb',
        ];
        let colorIndex = 0;
        const items = groups.map((g) => {
            if (!courseColors.has(g.courseId)) {
                courseColors.set(g.courseId, palette[colorIndex % palette.length]);
                colorIndex++;
            }
            return {
                id: g.id,
                name: g.name,
                courseName: g.course.name,
                teacherName: `${g.teacher.user.firstName} ${g.teacher.user.lastName}`,
                roomName: g.room?.name || null,
                roomId: g.room?.id || null,
                dayType: g.dayType,
                startTime: g.startTime,
                endTime: g.endTime,
                studentsCount: g._count.students,
                color: courseColors.get(g.courseId),
            };
        });
        const rooms = await this.prisma.room.findMany({
            where: { branchId, isActive: true },
            orderBy: { name: 'asc' },
        });
        const grid = rooms.map((room) => ({
            roomId: room.id,
            roomName: room.name,
            groups: items.filter((i) => i.roomId === room.id),
        }));
        const unassigned = items.filter((i) => !i.roomId);
        if (unassigned.length > 0) {
            grid.push({
                roomId: 0,
                roomName: 'No Room',
                groups: unassigned,
            });
        }
        return { items, grid };
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map