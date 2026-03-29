import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwt.strategy';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(phone: string, password: string): Promise<{
        accessToken: string;
        refreshToken: `${string}-${string}-${string}-${string}-${string}`;
        user: {
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
        };
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: `${string}-${string}-${string}-${string}-${string}`;
        user: {
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
        };
    }>;
    logout(token: string): Promise<{
        message: string;
    }>;
    getProfile(userId: number): Promise<{
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
    generateTokens(user: {
        id: number;
        phone: string;
        role: string;
    }): Promise<{
        accessToken: string;
        refreshToken: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    validateUser(payload: JwtPayload): Promise<{
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
    } | null>;
}
