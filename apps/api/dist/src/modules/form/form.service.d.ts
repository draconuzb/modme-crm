import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
export declare class FormService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
    create(branchId: number, dto: CreateFormDto): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: number, dto: Partial<CreateFormDto>): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
    delete(id: number): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
