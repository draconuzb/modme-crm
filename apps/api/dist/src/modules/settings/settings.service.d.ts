import { PrismaService } from '../prisma/prisma.service';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getGeneral(): Promise<{
        message: string;
    }>;
    updateGeneral(body: any): Promise<{
        message: string;
    }>;
    getSms(): Promise<{
        message: string;
    }>;
    updateSms(body: any): Promise<{
        message: string;
    }>;
    getVoip(): Promise<{
        message: string;
    }>;
    updateVoip(body: any): Promise<{
        message: string;
    }>;
}
