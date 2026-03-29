import { PrismaService } from '../prisma/prisma.service';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { MarkTeacherAttendanceDto } from './dto/mark-teacher-attendance.dto';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    bulkMark(dto: BulkAttendanceDto): Promise<{
        message: string;
        count: number;
    }>;
    getReport(branchId: number, query: QueryAttendanceDto): Promise<{
        data: {
            id: number;
            studentName: string;
            phone: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
            groupName: string;
            teacherName: string;
            lessonTime: string;
            date: Date;
            note: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getStudentAttendance(studentId: number, month: number, year: number): Promise<{
        id: number;
        date: Date;
        status: import("@prisma/client").$Enums.AttendanceStatus;
        groupName: string;
        note: string | null;
    }[]>;
    getGroupMonthlyAttendance(groupId: number, month: number, year: number): Promise<{
        dates: string[];
        students: {
            studentId: number;
            studentName: string;
            status: string;
            attendance: Record<string, string | null>;
        }[];
    }>;
    getTeacherAttendance(branchId: number, month: number, year: number): Promise<{
        dates: string[];
        teachers: {
            teacherId: number;
            teacherName: string;
            attendance: Record<string, {
                status: string;
                checkIn: Date | null;
                checkOut: Date | null;
            } | null>;
        }[];
    }>;
    markTeacherAttendance(dto: MarkTeacherAttendanceDto): Promise<{
        id: number;
        createdAt: Date;
        status: string;
        teacherId: number;
        note: string | null;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
    }>;
    getTeacherWorkSchedule(teacherId: number): Promise<{
        id: number;
        teacherId: number;
        startTime: string;
        endTime: string;
        dayOfWeek: number;
    }[]>;
}
