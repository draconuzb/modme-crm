import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    findAll(branchId: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        branchId: number;
        color: string | null;
    }[]>;
    create(dto: CreateTagDto, branchId: number): Promise<{
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
