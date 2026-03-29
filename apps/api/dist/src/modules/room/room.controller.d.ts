import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    findAll(branchId: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }[]>;
    create(dto: CreateRoomDto, branchId: number): Promise<{
        id: number;
        name: string;
        isActive: boolean;
        branchId: number;
        capacity: number | null;
    }>;
    findOne(id: number): Promise<{
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
