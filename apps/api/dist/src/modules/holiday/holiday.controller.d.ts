import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
export declare class HolidayController {
    private readonly holidayService;
    constructor(holidayService: HolidayService);
    findAll(branchId: number): Promise<{
        id: number;
        name: string;
        branchId: number;
        date: Date;
    }[]>;
    create(branchId: number, dto: CreateHolidayDto): Promise<{
        id: number;
        name: string;
        branchId: number;
        date: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        branchId: number;
        date: Date;
    }>;
}
