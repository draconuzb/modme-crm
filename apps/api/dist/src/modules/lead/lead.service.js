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
exports.LeadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let LeadService = class LeadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(branchId, query) {
        const { search, courseId, source, assignedToId, tagIds, status, startDate, endDate } = query;
        const where = { branchId };
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
            ];
        }
        if (courseId)
            where.courseId = courseId;
        if (source)
            where.source = source;
        if (assignedToId)
            where.assignedToId = assignedToId;
        if (status)
            where.status = status;
        if (tagIds && tagIds.length > 0) {
            where.tags = {
                some: { tagId: { in: tagIds } },
            };
        }
        if (startDate) {
            where.createdAt = { ...where.createdAt, gte: new Date(startDate) };
        }
        if (endDate) {
            where.createdAt = { ...where.createdAt, lte: new Date(endDate) };
        }
        const leads = await this.prisma.lead.findMany({
            where,
            include: {
                tags: {
                    include: { tag: true },
                },
                course: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        const grouped = {
            LEAD: leads.filter((l) => l.status === 'LEAD'),
            EXPECTATION: leads.filter((l) => l.status === 'EXPECTATION'),
            SET: leads.filter((l) => l.status === 'SET'),
        };
        return {
            data: grouped,
            counts: {
                LEAD: grouped.LEAD.length,
                EXPECTATION: grouped.EXPECTATION.length,
                SET: grouped.SET.length,
                total: leads.length,
            },
        };
    }
    async findOne(id) {
        const lead = await this.prisma.lead.findUnique({
            where: { id },
            include: {
                tags: {
                    include: { tag: true },
                },
                course: { select: { id: true, name: true } },
                reminders: {
                    orderBy: { dueDate: 'asc' },
                },
            },
        });
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return lead;
    }
    async create(branchId, dto) {
        return this.prisma.lead.create({
            data: {
                branchId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                source: dto.source,
                courseId: dto.courseId,
                note: dto.note,
            },
            include: {
                tags: {
                    include: { tag: true },
                },
                course: { select: { id: true, name: true } },
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = {};
        if (dto.firstName !== undefined)
            data.firstName = dto.firstName;
        if (dto.lastName !== undefined)
            data.lastName = dto.lastName;
        if (dto.phone !== undefined)
            data.phone = dto.phone;
        if (dto.source !== undefined)
            data.source = dto.source;
        if (dto.courseId !== undefined)
            data.courseId = dto.courseId;
        if (dto.note !== undefined)
            data.note = dto.note;
        if (dto.status !== undefined)
            data.status = dto.status;
        if (dto.assignedToId !== undefined)
            data.assignedToId = dto.assignedToId;
        return this.prisma.lead.update({
            where: { id },
            data,
            include: {
                tags: {
                    include: { tag: true },
                },
                course: { select: { id: true, name: true } },
            },
        });
    }
    async updateStatus(id, status) {
        await this.findOne(id);
        return this.prisma.lead.update({
            where: { id },
            data: { status: status },
            include: {
                tags: {
                    include: { tag: true },
                },
                course: { select: { id: true, name: true } },
            },
        });
    }
    async convert(id, branchId) {
        const lead = await this.findOne(id);
        const randomPass = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPass, 10);
        const user = await this.prisma.user.create({
            data: {
                firstName: lead.firstName,
                lastName: lead.lastName || '',
                phone: lead.phone,
                password: hashedPassword,
                role: 'STUDENT',
                branches: {
                    create: { branchId },
                },
            },
        });
        const student = await this.prisma.student.create({
            data: {
                userId: user.id,
                branchId,
                leadId: lead.id,
            },
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
        });
        return student;
    }
    async addTag(leadId, tagId) {
        await this.findOne(leadId);
        return this.prisma.leadTag.create({
            data: { leadId, tagId },
            include: { tag: true },
        });
    }
    async removeTag(leadId, tagId) {
        await this.findOne(leadId);
        return this.prisma.leadTag.delete({
            where: {
                leadId_tagId: { leadId, tagId },
            },
        });
    }
};
exports.LeadService = LeadService;
exports.LeadService = LeadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadService);
//# sourceMappingURL=lead.service.js.map