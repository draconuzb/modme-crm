declare class AttendanceRecordDto {
    studentId: number;
    status: string;
    note?: string;
}
export declare class BulkAttendanceDto {
    groupId: number;
    date: string;
    records: AttendanceRecordDto[];
}
export {};
