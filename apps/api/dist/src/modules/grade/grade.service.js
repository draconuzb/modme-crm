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
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GradeService = class GradeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSettings(branchId) {
        return {
            maxScore: 100,
            passingScore: 60,
            labels: [
                { label: 'A', min: 90, max: 100 },
                { label: 'B', min: 75, max: 89 },
                { label: 'C', min: 60, max: 74 },
                { label: 'D', min: 40, max: 59 },
                { label: 'F', min: 0, max: 39 },
            ],
        };
    }
    async updateSettings(branchId, dto) {
        return { success: true, ...dto };
    }
    async getGrades(groupId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const students = await this.prisma.groupStudent.findMany({
            where: { groupId, status: 'ACTIVE' },
            include: { student: { include: { user: true } } },
        });
        const grades = await this.prisma.gradeRecord.findMany({
            where: {
                groupId,
                date: { gte: startDate, lte: endDate },
            },
            orderBy: { date: 'asc' },
        });
        const dates = [...new Set(grades.map((g) => g.date.toISOString().split('T')[0]))].sort();
        const matrix = students.map((gs) => ({
            studentId: gs.studentId,
            studentName: `${gs.student.user.firstName} ${gs.student.user.lastName}`,
            grades: dates.map((d) => {
                const record = grades.find((g) => g.studentId === gs.studentId &&
                    g.date.toISOString().split('T')[0] === d);
                return {
                    date: d,
                    score: record?.score ?? null,
                    comment: record?.comment ?? null,
                };
            }),
        }));
        return { dates, students: matrix };
    }
    async setGrade(groupId, studentId, date, score, comment) {
        const dateObj = new Date(date);
        return this.prisma.gradeRecord.upsert({
            where: {
                groupId_studentId_date: { groupId, studentId, date: dateObj },
            },
            update: { score, comment },
            create: { groupId, studentId, date: dateObj, score, comment },
        });
    }
};
exports.GradeService = GradeService;
exports.GradeService = GradeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GradeService);
//# sourceMappingURL=grade.service.js.map