import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }>;
    create(branchId: number, dto: CreateBlogDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }>;
    update(id: number, dto: Partial<CreateBlogDto>): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }>;
}
