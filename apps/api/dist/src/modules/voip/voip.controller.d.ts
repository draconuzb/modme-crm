import { VoipService } from './voip.service';
export declare class VoipController {
    private readonly voipService;
    constructor(voipService: VoipService);
    getCalls(branchId: number, page?: number, limit?: number, startDate?: string, endDate?: string, direction?: string, studentId?: number): Promise<{
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
            duration: number | null;
            studentId: number;
            direction: string;
            recordingUrl: string | null;
            calledAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createCall(body: {
        studentId: number;
        phone: string;
        direction: string;
        duration?: number;
        recordingUrl?: string;
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
        duration: number | null;
        studentId: number;
        direction: string;
        recordingUrl: string | null;
        calledAt: Date;
    }>;
}
