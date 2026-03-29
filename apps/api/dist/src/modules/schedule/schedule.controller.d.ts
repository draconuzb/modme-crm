import { ScheduleService } from './schedule.service';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
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
