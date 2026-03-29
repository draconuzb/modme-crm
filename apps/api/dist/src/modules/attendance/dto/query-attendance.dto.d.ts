import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class QueryAttendanceDto extends PaginationDto {
    groupId?: number;
    teacherId?: number;
    studentId?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
}
