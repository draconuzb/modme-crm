import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { SubmitResultDto } from './dto/submit-result.dto';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    findAll(groupId: number): Promise<{
        resultsCount: number;
        _count: undefined;
        id: number;
        createdAt: Date;
        title: string;
        groupId: number;
        date: Date;
        maxScore: number;
    }[]>;
    create(dto: CreateExamDto): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        groupId: number;
        date: Date;
        maxScore: number;
    }>;
    findOne(id: number): Promise<{
        results: {
            id: number;
            studentId: number;
            studentName: string;
            score: number;
        }[];
        id: number;
        createdAt: Date;
        title: string;
        groupId: number;
        date: Date;
        maxScore: number;
    }>;
    submitResult(id: number, dto: SubmitResultDto): Promise<{
        id: number;
        createdAt: Date;
        studentId: number;
        score: number;
        examId: number;
    }>;
    submitBulkResults(id: number, results: SubmitResultDto[]): Promise<{
        id: number;
        createdAt: Date;
        studentId: number;
        score: number;
        examId: number;
    }[]>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        groupId: number;
        date: Date;
        maxScore: number;
    }>;
}
