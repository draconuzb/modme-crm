import { PrismaService } from '../prisma/prisma.service';
export declare class ScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    getSchedule(branchId: number, dayType?: string): Promise<{
        items: {
            id: number;
            name: string;
            courseName: string;
            teacherName: string;
            roomName: string | null;
            roomId: number | null;
            dayType: import("@prisma/client").$Enums.DayType;
            startTime: string;
            endTime: string;
            studentsCount: number;
            color: string;
        }[];
        grid: {
            roomId: number;
            roomName: string;
            groups: {
                id: number;
                name: string;
                courseName: string;
                teacherName: string;
                roomName: string | null;
                roomId: number | null;
                dayType: import("@prisma/client").$Enums.DayType;
                startTime: string;
                endTime: string;
                studentsCount: number;
                color: string;
            }[];
        }[];
    }>;
}
