import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        branchId: number;
        color: string | null;
    }[]>;
    create(branchId: number, dto: CreateTagDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        branchId: number;
        color: string | null;
    }>;
    update(id: number, dto: UpdateTagDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        branchId: number;
        color: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        branchId: number;
        color: string | null;
    }>;
}
