import { PrismaService } from '../prisma/prisma.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
export declare class HolidayService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number): Promise<{
        id: number;
        name: string;
        branchId: number;
        date: Date;
    }[]>;
    create(branchId: number, dto: CreateHolidayDto): Promise<{
        id: number;
        name: string;
        branchId: number;
        date: Date;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        branchId: number;
        date: Date;
    }>;
}
