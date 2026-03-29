import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
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
    getDashboardRevenue(branchId: number, months?: string): Promise<{
        month: string;
        revenue: number;
    }[]>;
    getConversion(branchId: number, startDate?: string, endDate?: string, source?: string, staffId?: string): Promise<{
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
    getLogs(branchId: number, page?: string, limit?: string): Promise<{
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
    getAttendance(): Promise<{
        message: string;
    }>;
    getLeads(): Promise<{
        message: string;
    }>;
}
