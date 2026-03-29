import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    findAll(branchId: number, query: PaginationDto): Promise<{
        data: {
            id: number;
            userId: number;
            firstName: string;
            lastName: string;
            phone: string;
            avatar: string | null;
            groupsCount: number;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(branchId: number, dto: CreateTeacherDto): Promise<{
        user: {
            id: number;
            phone: string;
            createdAt: Date;
            firstName: string;
            lastName: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        bio: string | null;
    }>;
    findOne(id: number): Promise<{
        user: {
            branches: ({
                branch: {
                    id: number;
                    name: string;
                    address: string | null;
                    phone: string | null;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                userId: number;
                branchId: number;
            })[];
            id: number;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.Role;
            gender: string | null;
            dateOfBirth: Date | null;
        };
        groups: ({
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
        id: number;
        createdAt: Date;
        userId: number;
        bio: string | null;
    }>;
    update(id: number, dto: UpdateTeacherDto): Promise<{
        user: {
            branches: ({
                branch: {
                    id: number;
                    name: string;
                    address: string | null;
                    phone: string | null;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                userId: number;
                branchId: number;
            })[];
            id: number;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.Role;
            gender: string | null;
            dateOfBirth: Date | null;
        };
        groups: ({
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
        id: number;
        createdAt: Date;
        userId: number;
        bio: string | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getHistory(id: number): Promise<({
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
    getSalary(id: number, month: string, year: string): Promise<{
        groupId: number;
        groupName: string;
        courseName: string;
        studentsCount: number;
        totalLessons: number;
        attended: number;
        absent: number;
        fixedAmount: number;
        calculatedAmount: number;
    }[]>;
}
