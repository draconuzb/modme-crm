export declare enum DayTypeEnum {
    ODD = "ODD",
    EVEN = "EVEN",
    OTHER = "OTHER"
}
export declare class CreateGroupDto {
    name: string;
    courseId: number;
    teacherId: number;
    roomId?: number;
    dayType: DayTypeEnum;
    customDays?: string;
    startTime: string;
    endTime: string;
    startDate: string;
    capacity?: number;
    note?: string;
}
