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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamService = class ExamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(groupId) {
        const exams = await this.prisma.exam.findMany({
            where: { groupId },
            include: { _count: { select: { results: true } } },
            orderBy: { date: 'desc' },
        });
        return exams.map((e) => ({
            ...e,
            resultsCount: e._count.results,
            _count: undefined,
        }));
    }
    async findOne(id) {
        const exam = await this.prisma.exam.findUnique({
            where: { id },
            include: {
                results: {
                    include: { student: { include: { user: true } } },
                    orderBy: { score: 'desc' },
                },
            },
        });
        if (!exam)
            throw new common_1.NotFoundException('Exam not found');
        return {
            ...exam,
            results: exam.results.map((r) => ({
                id: r.id,
                studentId: r.studentId,
                studentName: `${r.student.user.firstName} ${r.student.user.lastName}`,
                score: r.score,
            })),
        };
    }
    async create(dto) {
        return this.prisma.exam.create({
            data: {
                groupId: dto.groupId,
                title: dto.title,
                date: new Date(dto.date),
                maxScore: dto.maxScore,
            },
        });
    }
    async submitResult(examId, dto) {
        return this.prisma.examResult.upsert({
            where: {
                examId_studentId: { examId, studentId: dto.studentId },
            },
            update: { score: dto.score },
            create: { examId, studentId: dto.studentId, score: dto.score },
        });
    }
    async submitBulkResults(examId, results) {
        const ops = results.map((r) => this.prisma.examResult.upsert({
            where: {
                examId_studentId: { examId, studentId: r.studentId },
            },
            update: { score: r.score },
            create: { examId, studentId: r.studentId, score: r.score },
        }));
        return this.prisma.$transaction(ops);
    }
    async delete(id) {
        return this.prisma.exam.delete({ where: { id } });
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamService);
//# sourceMappingURL=exam.service.js.map