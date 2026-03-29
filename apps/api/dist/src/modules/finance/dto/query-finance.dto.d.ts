import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class QueryFinanceDto extends PaginationDto {
    startDate?: string;
    endDate?: string;
    studentId?: number;
    groupId?: number;
    courseId?: number;
    teacherId?: number;
    method?: string;
    minAmount?: number;
    maxAmount?: number;
    createdById?: number;
}
