import { SmsService } from './sms.service';
export declare class SmsController {
    private readonly smsService;
    constructor(smsService: SmsService);
    send(body: {
        studentId: number;
        message: string;
    }): Promise<{
        student: {
            user: {
                id: number;
                phone: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            branchId: number;
            note: string | null;
            balance: import("@prisma/client/runtime/library").Decimal;
            coins: number;
            externalId: string | null;
            leadId: number | null;
            isArchived: boolean;
        };
    } & {
        id: number;
        phone: string;
        status: string;
        studentId: number;
        message: string;
        sentAt: Date;
    }>;
    bulkSend(body: {
        studentIds: number[];
        message: string;
    }): Promise<{
        sent: number;
        records: ({
            student: {
                user: {
                    id: number;
                    phone: string;
                    firstName: string;
                    lastName: string;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                branchId: number;
                note: string | null;
                balance: import("@prisma/client/runtime/library").Decimal;
                coins: number;
                externalId: string | null;
                leadId: number | null;
                isArchived: boolean;
            };
        } & {
            id: number;
            phone: string;
            status: string;
            studentId: number;
            message: string;
            sentAt: Date;
        })[];
    }>;
    getHistory(branchId: number, page?: number, limit?: number, startDate?: string, endDate?: string, studentId?: number): Promise<{
        data: ({
            student: {
                user: {
                    id: number;
                    phone: string;
                    firstName: string;
                    lastName: string;
                };
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: number;
                branchId: number;
                note: string | null;
                balance: import("@prisma/client/runtime/library").Decimal;
                coins: number;
                externalId: string | null;
                leadId: number | null;
                isArchived: boolean;
            };
        } & {
            id: number;
            phone: string;
            status: string;
            studentId: number;
            message: string;
            sentAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
