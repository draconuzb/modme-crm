import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
export declare class ReminderController {
    private readonly reminderService;
    constructor(reminderService: ReminderService);
    findAll(branchId: number): Promise<{
        overdue: {
            id: any;
            title: any;
            description: any;
            dueDate: any;
            assignedToId: any;
            lead: {
                id: any;
                firstName: any;
                phone: any;
            } | null;
            student: {
                id: any;
                firstName: any;
                lastName: any;
                phone: any;
            } | null;
            createdAt: any;
        }[];
        today: {
            id: any;
            title: any;
            description: any;
            dueDate: any;
            assignedToId: any;
            lead: {
                id: any;
                firstName: any;
                phone: any;
            } | null;
            student: {
                id: any;
                firstName: any;
                lastName: any;
                phone: any;
            } | null;
            createdAt: any;
        }[];
        future: {
            id: any;
            title: any;
            description: any;
            dueDate: any;
            assignedToId: any;
            lead: {
                id: any;
                firstName: any;
                phone: any;
            } | null;
            student: {
                id: any;
                firstName: any;
                lastName: any;
                phone: any;
            } | null;
            createdAt: any;
        }[];
    }>;
    create(branchId: number, user: any, dto: CreateReminderDto): Promise<{
        id: number;
        createdAt: Date;
        branchId: number;
        description: string | null;
        title: string;
        studentId: number | null;
        leadId: number | null;
        assignedToId: number | null;
        dueDate: Date;
        isCompleted: boolean;
        completedAt: Date | null;
        completionNote: string | null;
        createdById: number;
    }>;
    complete(id: number, note?: string): Promise<{
        id: number;
        createdAt: Date;
        branchId: number;
        description: string | null;
        title: string;
        studentId: number | null;
        leadId: number | null;
        assignedToId: number | null;
        dueDate: Date;
        isCompleted: boolean;
        completedAt: Date | null;
        completionNote: string | null;
        createdById: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        branchId: number;
        description: string | null;
        title: string;
        studentId: number | null;
        leadId: number | null;
        assignedToId: number | null;
        dueDate: Date;
        isCompleted: boolean;
        completedAt: Date | null;
        completionNote: string | null;
        createdById: number;
    }>;
}
