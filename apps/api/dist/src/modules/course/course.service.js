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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseService = class CourseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(branchId) {
        return this.prisma.course.findMany({
            where: { branchId, isActive: true },
            include: {
                subcourses: { orderBy: { sortOrder: 'asc' } },
                groups: {
                    include: {
                        _count: { select: { students: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                subcourses: { orderBy: { sortOrder: 'asc' } },
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async create(branchId, dto) {
        return this.prisma.course.create({
            data: {
                branchId,
                name: dto.name,
                description: dto.description,
                price: dto.price,
                duration: dto.duration,
                lessonDuration: dto.lessonDuration,
            },
        });
    }
    async update(id, dto) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.prisma.course.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.prisma.course.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async addSubcourse(courseId, dto) {
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.prisma.subcourse.create({
            data: {
                courseId,
                name: dto.name,
                materials: dto.materials,
                sortOrder: dto.sortOrder ?? 0,
            },
        });
    }
    async updateSubcourse(id, dto) {
        const subcourse = await this.prisma.subcourse.findUnique({ where: { id } });
        if (!subcourse)
            throw new common_1.NotFoundException('Subcourse not found');
        return this.prisma.subcourse.update({
            where: { id },
            data: dto,
        });
    }
    async removeSubcourse(id) {
        const subcourse = await this.prisma.subcourse.findUnique({ where: { id } });
        if (!subcourse)
            throw new common_1.NotFoundException('Subcourse not found');
        return this.prisma.subcourse.delete({ where: { id } });
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map