import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddStudentToGroupDto } from './dto/add-student-to-group.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    findAll(branchId: number, query: PaginationDto & {
        courseId?: string;
        teacherId?: string;
        dayType?: string;
        status?: string;
        tagIds?: string;
    }): Promise<{
        data: ({
            tags: ({
                tag: {
                    id: number;
                    name: string;
                    color: string | null;
                };
            } & {
                groupId: number;
                tagId: number;
            })[];
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
            room: {
                id: number;
                name: string;
            } | null;
            course: {
                id: number;
                name: string;
            };
            _count: {
                students: number;
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(branchId: number, dto: CreateGroupDto): Promise<{
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
        room: {
            id: number;
            name: string;
        } | null;
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
    }>;
    findOne(id: number): Promise<{
        students: ({
            student: {
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
        tags: ({
            tag: {
                id: number;
                name: string;
                color: string | null;
            };
        } & {
            groupId: number;
            tagId: number;
        })[];
        teacher: {
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
            userId: number;
            bio: string | null;
        };
        room: {
            id: number;
            name: string;
            isActive: boolean;
            branchId: number;
            capacity: number | null;
        } | null;
        course: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            branchId: number;
            description: string | null;
            image: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            duration: number | null;
            lessonDuration: number | null;
        };
        _count: {
            students: number;
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
    }>;
    update(id: number, dto: UpdateGroupDto): Promise<{
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
        room: {
            id: number;
            name: string;
        } | null;
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
    }>;
    addStudent(id: number, dto: AddStudentToGroupDto): Promise<{
        student: {
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
    }>;
    removeStudent(id: number, studentId: number): Promise<{
        id: number;
        createdAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        status: string;
        startDate: Date;
        endDate: Date | null;
        groupId: number;
        studentId: number;
    }>;
    getAttendance(id: number, month: string, year: string): Promise<{
        dates: string[];
        students: {
            studentId: number;
            firstName: string;
            lastName: string;
            status: string;
            attendance: Record<string, string | null>;
        }[];
        daysInMonth: number;
    }>;
    getStudents(id: number): Promise<({
        student: {
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
}
