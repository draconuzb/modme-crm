import { PrismaService } from '../prisma/prisma.service';
export declare class SmsService {
    private prisma;
    constructor(prisma: PrismaService);
    sendSms(studentId: number, message: string): Promise<{
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
    getHistory(branchId: number, query: {
        page?: number;
        limit?: number;
        startDate?: string;
        endDate?: string;
        studentId?: number;
    }): Promise<{
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
    bulkSend(studentIds: number[], message: string): Promise<{
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
}
