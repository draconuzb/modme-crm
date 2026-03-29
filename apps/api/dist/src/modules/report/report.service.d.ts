import { PrismaService } from '../prisma/prisma.service';
export declare class ReportService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(branchId: number): Promise<{
        activeLeads: number;
        activeStudents: number;
        totalGroups: number;
        debtors: number;
        trialStudents: number;
        paidThisMonth: number;
        leftActiveGroup: number;
        leftAfterTrial: number;
    }>;
    getRevenueChart(branchId: number, months?: number): Promise<{
        month: string;
        revenue: number;
    }[]>;
    getConversionReport(branchId: number, startDate?: string, endDate?: string, source?: string, staffId?: number): Promise<{
        incoming: number;
        waiting: number;
        set: number;
        attended: number;
        paid: number;
        rates: {
            waitingRate: number;
            setRate: number;
            attendedRate: number;
            paidRate: number;
        };
    }>;
    getStudentsLeft(branchId: number): Promise<{
        id: number;
        studentName: string;
        phone: string;
        groupName: string;
        groupId: number;
        startDate: Date;
        endDate: Date | null;
    }[]>;
    getLogs(branchId: number, page?: number, limit?: number): Promise<{
        data: {
            id: number;
            userName: string;
            action: string;
            entity: string;
            entityId: number | null;
            details: import("@prisma/client/runtime/library").JsonValue;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getConversion(): Promise<{
        message: string;
    }>;
    getAttendance(): Promise<{
        message: string;
    }>;
    getLeads(): Promise<{
        message: string;
    }>;
}
