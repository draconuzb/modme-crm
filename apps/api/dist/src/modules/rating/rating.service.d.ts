import { PrismaService } from '../prisma/prisma.service';
export declare class RatingService {
    private prisma;
    constructor(prisma: PrismaService);
    getRatings(branchId: number, startDate?: string, endDate?: string, groupId?: number): Promise<{
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
