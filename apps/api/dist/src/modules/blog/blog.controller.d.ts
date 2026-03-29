import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(branchId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }[]>;
    create(branchId: number, dto: CreateBlogDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }>;
    findOne(id: number): Promise<{
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
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        branchId: number;
        title: string;
        content: string;
        isPublished: boolean;
    }>;
}
