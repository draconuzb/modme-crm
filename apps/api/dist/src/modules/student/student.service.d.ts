import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
export declare class StudentService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number, query: QueryStudentDto): Promise<{
        data: ({
            user: {
                id: number;
                phone: string;
                createdAt: Date;
                firstName: string;
                lastName: string;
                avatar: string | null;
                gender: string | null;
                dateOfBirth: Date | null;
            };
            groupEnrollments: ({
                group: {
                    teacher: {
                        user: {
                            id: number;
                            firstName: string;
                            lastName: string;
                        };
                    } & {
                        id: number;
                        createdAt: Date;
                        userId: number;
                        bio: string | null;
                    };
                    course: {
                        id: number;
                        name: string;
                    };
                } & {
                    id: number;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    branchId: number;
                    capacity: number | null;
                    status: import("@prisma/client").$Enums.GroupStatus;
                    courseId: number;
                    teacherId: number;
                    roomId: number | null;
                    dayType: import("@prisma/client").$Enums.DayType;
                    customDays: string | null;
                    startTime: string;
                    endTime: string;
                    startDate: Date;
                    endDate: Date | null;
                    note: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                price: import("@prisma/client/runtime/library").Decimal;
                status: string;
                startDate: Date;
                endDate: Date | null;
                groupId: number;
                studentId: number;
            })[];
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        user: {
            id: number;
            phone: string;
            createdAt: Date;
            firstName: string;
            lastName: string;
            avatar: string | null;
            gender: string | null;
            dateOfBirth: Date | null;
        };
        lead: {
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
        } | null;
        groupEnrollments: ({
            group: {
                teacher: {
                    user: {
                        id: number;
                        firstName: string;
                        lastName: string;
                    };
                } & {
                    id: number;
                    createdAt: Date;
                    userId: number;
                    bio: string | null;
                };
                course: {
                    id: number;
                    name: string;
                };
            } & {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                branchId: number;
                capacity: number | null;
                status: import("@prisma/client").$Enums.GroupStatus;
                courseId: number;
                teacherId: number;
                roomId: number | null;
                dayType: import("@prisma/client").$Enums.DayType;
                customDays: string | null;
                startTime: string;
                endTime: string;
                startDate: Date;
                endDate: Date | null;
                note: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            status: string;
            startDate: Date;
            endDate: Date | null;
            groupId: number;
            studentId: number;
        })[];
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
    create(branchId: number, dto: CreateStudentDto): Promise<{
        user: {
            id: number;
            phone: string;
            firstName: string;
            lastName: string;
            avatar: string | null;
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
    update(id: number, dto: UpdateStudentDto): Promise<{
        user: {
            id: number;
            phone: string;
            createdAt: Date;
            firstName: string;
            lastName: string;
            avatar: string | null;
            gender: string | null;
            dateOfBirth: Date | null;
        };
        lead: {
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
        } | null;
        groupEnrollments: ({
            group: {
                teacher: {
                    user: {
                        id: number;
                        firstName: string;
                        lastName: string;
                    };
                } & {
                    id: number;
                    createdAt: Date;
                    userId: number;
                    bio: string | null;
                };
                course: {
                    id: number;
                    name: string;
                };
            } & {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                branchId: number;
                capacity: number | null;
                status: import("@prisma/client").$Enums.GroupStatus;
                courseId: number;
                teacherId: number;
                roomId: number | null;
                dayType: import("@prisma/client").$Enums.DayType;
                customDays: string | null;
                startTime: string;
                endTime: string;
                startDate: Date;
                endDate: Date | null;
                note: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            status: string;
            startDate: Date;
            endDate: Date | null;
            groupId: number;
            studentId: number;
        })[];
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
    getGroups(studentId: number): Promise<({
        group: {
            teacher: {
                user: {
                    id: number;
                    firstName: string;
                    lastName: string;
                };
            } & {
                id: number;
                createdAt: Date;
                userId: number;
                bio: string | null;
            };
            course: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            branchId: number;
            capacity: number | null;
            status: import("@prisma/client").$Enums.GroupStatus;
            courseId: number;
            teacherId: number;
            roomId: number | null;
            dayType: import("@prisma/client").$Enums.DayType;
            customDays: string | null;
            startTime: string;
            endTime: string;
            startDate: Date;
            endDate: Date | null;
            note: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        status: string;
        startDate: Date;
        endDate: Date | null;
        groupId: number;
        studentId: number;
    })[]>;
    getComments(studentId: number): Promise<({
        author: {
            id: number;
            firstName: string;
            lastName: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        studentId: number;
        authorId: number;
        text: string;
    })[]>;
    addComment(studentId: number, authorId: number, text: string): Promise<{
        author: {
            id: number;
            firstName: string;
            lastName: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        studentId: number;
        authorId: number;
        text: string;
    }>;
    getCallHistory(studentId: number): Promise<{
        id: number;
        phone: string;
        duration: number | null;
        studentId: number;
        direction: string;
        recordingUrl: string | null;
        calledAt: Date;
    }[]>;
    getSmsHistory(studentId: number): Promise<{
        id: number;
        phone: string;
        status: string;
        studentId: number;
        message: string;
        sentAt: Date;
    }[]>;
    getHistory(studentId: number): Promise<({
        user: {
            id: number;
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        action: string;
        entity: string;
        entityId: number | null;
        details: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    getLeadHistory(studentId: number): Promise<({
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
    }) | null>;
    addPayment(studentId: number, branchId: number, dto: {
        amount: number;
        method: string;
        description?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        branchId: number;
        description: string | null;
        studentId: number;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdById: number | null;
        method: import("@prisma/client").$Enums.PaymentMethod;
    }>;
    getBalance(studentId: number): Promise<{
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
}
