import { GradeService } from './grade.service';
export declare class GradeController {
    private readonly gradeService;
    constructor(gradeService: GradeService);
    getSettings(branchId: number): Promise<{
        maxScore: number;
        passingScore: number;
        labels: {
            label: string;
            min: number;
            max: number;
        }[];
    }>;
    updateSettings(branchId: number, body: any): Promise<any>;
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
    setGrade(body: {
        groupId: number;
        studentId: number;
        date: string;
        score: number;
        comment?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        comment: string | null;
        groupId: number;
        studentId: number;
        date: Date;
        score: number;
    }>;
}
