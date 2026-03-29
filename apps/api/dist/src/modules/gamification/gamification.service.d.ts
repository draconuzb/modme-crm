import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class GamificationService {
    private prisma;
    constructor(prisma: PrismaService);
    getProducts(branchId: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        description: string | null;
        image: string | null;
        coinPrice: number;
        stock: number;
    }[]>;
    createProduct(branchId: number, dto: CreateProductDto): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        description: string | null;
        image: string | null;
        coinPrice: number;
        stock: number;
    }>;
    updateProduct(id: number, dto: Partial<CreateProductDto>): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        description: string | null;
        image: string | null;
        coinPrice: number;
        stock: number;
    }>;
    deleteProduct(id: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        branchId: number;
        description: string | null;
        image: string | null;
        coinPrice: number;
        stock: number;
    }>;
    getOrders(branchId: number, query: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<{
        data: {
            productName: string;
            student: {
                user: {
                    id: number;
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
            id: number;
            createdAt: Date;
            branchId: number;
            status: string;
            studentId: number;
            productId: number;
            coinAmount: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createOrder(branchId: number, dto: CreateOrderDto): Promise<{
        productName: string;
        student: {
            user: {
                id: number;
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
        id: number;
        createdAt: Date;
        branchId: number;
        status: string;
        studentId: number;
        productId: number;
        coinAmount: number;
    }>;
    updateOrderStatus(id: number, status: string): Promise<{
        student: {
            user: {
                id: number;
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
        createdAt: Date;
        branchId: number;
        status: string;
        studentId: number;
        productId: number;
        coinAmount: number;
    }>;
}
