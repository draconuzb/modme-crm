import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(branchId: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }>;
    create(branchId: number, dto: CreateRoomDto): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }>;
    update(id: number, dto: UpdateRoomDto): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }>;
}
