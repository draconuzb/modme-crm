import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateSubcourseDto } from './dto/create-subcourse.dto';
export declare class CourseService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number): Promise<({
        groups: ({
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
        subcourses: {
            id: number;
            name: string;
            sortOrder: number;
            courseId: number;
            materials: string | null;
        }[];
    } & {
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
    })[]>;
    findOne(id: number): Promise<{
        subcourses: {
            id: number;
            name: string;
            sortOrder: number;
            courseId: number;
            materials: string | null;
        }[];
    } & {
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
    }>;
    create(branchId: number, dto: CreateCourseDto): Promise<{
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
    }>;
    update(id: number, dto: UpdateCourseDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
    addSubcourse(courseId: number, dto: CreateSubcourseDto): Promise<{
        id: number;
        name: string;
        sortOrder: number;
        courseId: number;
        materials: string | null;
    }>;
    updateSubcourse(id: number, dto: Partial<CreateSubcourseDto>): Promise<{
        id: number;
        name: string;
        sortOrder: number;
        courseId: number;
        materials: string | null;
    }>;
    removeSubcourse(id: number): Promise<{
        id: number;
        name: string;
        sortOrder: number;
        courseId: number;
        materials: string | null;
    }>;
}
