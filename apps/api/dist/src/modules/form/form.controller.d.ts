import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
export declare class FormController {
    private readonly formService;
    constructor(formService: FormService);
    findAll(branchId: number): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    create(branchId: number, dto: CreateFormDto): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findOne(id: number): Promise<{
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
    remove(id: number): Promise<{
        id: number;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        title: string;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
