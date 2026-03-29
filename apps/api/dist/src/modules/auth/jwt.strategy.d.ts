import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
export interface JwtPayload {
    sub: number;
    phone: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
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
}
export {};
