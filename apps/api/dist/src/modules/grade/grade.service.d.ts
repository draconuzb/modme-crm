import { PrismaService } from '../prisma/prisma.service';
export declare class GradeService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(branchId: number): Promise<{
        maxScore: number;
        passingScore: number;
        labels: {
            label: string;
            min: number;
            max: number;
        }[];
    }>;
    updateSettings(branchId: number, dto: any): Promise<any>;
    getGrades(groupId: number, month: number, year: number): Promise<{
        dates: string[];
        students: {
            studentId: number;
            studentName: string;
            grades: {
                date: string;
                score: number | null;
                comment: string | null;
            }[];
        }[];
    }>;
    setGrade(groupId: number, studentId: number, date: string, score: number, comment?: string): Promise<{
        id: number;
        createdAt: Date;
        comment: string | null;
        groupId: number;
        studentId: number;
        date: Date;
        score: number;
    }>;
}
