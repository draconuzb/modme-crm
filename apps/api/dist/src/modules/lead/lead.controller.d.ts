import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    findAll(branchId: number, query: QueryLeadDto): Promise<{
        data: {
            LEAD: ({
                tags: ({
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        branchId: number;
                        color: string | null;
                    };
                } & {
                    tagId: number;
                    leadId: number;
                })[];
                course: {
                    id: number;
                    name: string;
                } | null;
            } & {
                id: number;
                phone: string;
                createdAt: Date;
                updatedAt: Date;
                firstName: string;
                lastName: string | null;
                branchId: number;
                status: import("@prisma/client").$Enums.LeadStatus;
                courseId: number | null;
                note: string | null;
                source: string | null;
                assignedToId: number | null;
            })[];
            EXPECTATION: ({
                tags: ({
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        branchId: number;
                        color: string | null;
                    };
                } & {
                    tagId: number;
                    leadId: number;
                })[];
                course: {
                    id: number;
                    name: string;
                } | null;
            } & {
                id: number;
                phone: string;
                createdAt: Date;
                updatedAt: Date;
                firstName: string;
                lastName: string | null;
                branchId: number;
                status: import("@prisma/client").$Enums.LeadStatus;
                courseId: number | null;
                note: string | null;
                source: string | null;
                assignedToId: number | null;
            })[];
            SET: ({
                tags: ({
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        branchId: number;
                        color: string | null;
                    };
                } & {
                    tagId: number;
                    leadId: number;
                })[];
                course: {
                    id: number;
                    name: string;
                } | null;
            } & {
                id: number;
                phone: string;
                createdAt: Date;
                updatedAt: Date;
                firstName: string;
                lastName: string | null;
                branchId: number;
                status: import("@prisma/client").$Enums.LeadStatus;
                courseId: number | null;
                note: string | null;
                source: string | null;
                assignedToId: number | null;
            })[];
        };
        counts: {
            LEAD: number;
            EXPECTATION: number;
            SET: number;
            total: number;
        };
    }>;
    create(branchId: number, dto: CreateLeadDto): Promise<{
        tags: ({
            tag: {
                id: number;
                name: string;
                createdAt: Date;
                branchId: number;
                color: string | null;
            };
        } & {
            tagId: number;
            leadId: number;
        })[];
        course: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        branchId: number;
        status: import("@prisma/client").$Enums.LeadStatus;
        courseId: number | null;
        note: string | null;
        source: string | null;
        assignedToId: number | null;
    }>;
    findOne(id: number): Promise<{
        reminders: {
            id: number;
            createdAt: Date;
            branchId: number;
            description: string | null;
            title: string;
            studentId: number | null;
            leadId: number | null;
            assignedToId: number | null;
            dueDate: Date;
            isCompleted: boolean;
            completedAt: Date | null;
            completionNote: string | null;
            createdById: number;
        }[];
        tags: ({
            tag: {
                id: number;
                name: string;
                createdAt: Date;
                branchId: number;
                color: string | null;
            };
        } & {
            tagId: number;
            leadId: number;
        })[];
        course: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        branchId: number;
        status: import("@prisma/client").$Enums.LeadStatus;
        courseId: number | null;
        note: string | null;
        source: string | null;
        assignedToId: number | null;
    }>;
    update(id: number, dto: UpdateLeadDto): Promise<{
        tags: ({
            tag: {
                id: number;
                name: string;
                createdAt: Date;
                branchId: number;
                color: string | null;
            };
        } & {
            tagId: number;
            leadId: number;
        })[];
        course: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        branchId: number;
        status: import("@prisma/client").$Enums.LeadStatus;
        courseId: number | null;
        note: string | null;
        source: string | null;
        assignedToId: number | null;
    }>;
    updateStatus(id: number, status: string): Promise<{
        tags: ({
            tag: {
                id: number;
                name: string;
                createdAt: Date;
                branchId: number;
                color: string | null;
            };
        } & {
            tagId: number;
            leadId: number;
        })[];
        course: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        branchId: number;
        status: import("@prisma/client").$Enums.LeadStatus;
        courseId: number | null;
        note: string | null;
        source: string | null;
        assignedToId: number | null;
    }>;
    convert(id: number, branchId: number): Promise<{
        user: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        branchId: number;
        note: string | null;
        balance: import("@prisma/client/runtime/library").Decimal;
        coins: number;
        externalId: string | null;
        leadId: number | null;
        isArchived: boolean;
    }>;
    addTag(id: number, tagId: number): Promise<{
        tag: {
            id: number;
            name: string;
            createdAt: Date;
            branchId: number;
            color: string | null;
        };
    } & {
        tagId: number;
        leadId: number;
    }>;
    removeTag(id: number, tagId: number): Promise<{
        tagId: number;
        leadId: number;
    }>;
}
