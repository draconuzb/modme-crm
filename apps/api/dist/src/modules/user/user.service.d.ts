import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number, query: PaginationDto): Promise<{
        data: {
            id: number;
            phone: string;
            isActive: boolean;
            createdAt: Date;
            firstName: string;
            lastName: string;
            avatar: string | null;
            role: import("@prisma/client").$Enums.Role;
            gender: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        branches: ({
            branch: {
                id: number;
                name: string;
                address: string | null;
                phone: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            userId: number;
            branchId: number;
        })[];
        id: number;
        phone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.Role;
        gender: string | null;
        dateOfBirth: Date | null;
    }>;
    create(dto: CreateUserDto, branchId: number): Promise<{
        branches: ({
            branch: {
                id: number;
                name: string;
                address: string | null;
                phone: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            userId: number;
            branchId: number;
        })[];
        id: number;
        phone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.Role;
        gender: string | null;
        dateOfBirth: Date | null;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        id: number;
        phone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.Role;
        gender: string | null;
        dateOfBirth: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        phone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        password: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.Role;
        gender: string | null;
        dateOfBirth: Date | null;
    }>;
}
