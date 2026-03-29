import { RatingService } from './rating.service';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    getRatings(branchId: number, startDate?: string, endDate?: string, groupId?: string): Promise<{
        id: number;
        studentName: string;
        studentId: number;
        groupId: number;
        groupName: string;
        score: number;
        period: string;
        createdAt: Date;
    }[]>;
    getChartData(branchId: number, startDate?: string, endDate?: string): Promise<{
        studentName: string;
        score: number;
        period: string;
    }[]>;
}
