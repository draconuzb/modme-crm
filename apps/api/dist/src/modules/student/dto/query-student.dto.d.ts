import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class QueryStudentDto extends PaginationDto {
    courseId?: number;
    status?: string;
    financialStatus?: 'debtor' | 'paid' | 'overpaid';
    tagId?: number;
    startDate?: string;
    endDate?: string;
}
