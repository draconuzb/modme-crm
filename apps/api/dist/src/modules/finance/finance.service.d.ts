import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { QueryFinanceDto } from './dto/query-finance.dto';
export declare class FinanceService {
    private prisma;
    constructor(prisma: PrismaService);
    getPayments(branchId: number, query: QueryFinanceDto): Promise<{
        data: ({
            student: {
                user: {
                    id: number;
                    phone: string;
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
            description: string | null;
            studentId: number;
            date: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            createdById: number | null;
            method: import("@prisma/client").$Enums.PaymentMethod;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        totalAmount: number | import("@prisma/client/runtime/library").Decimal;
    }>;
    createPayment(branchId: number, dto: CreatePaymentDto, userId: number): Promise<{
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
        description: string | null;
        studentId: number;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdById: number | null;
        method: import("@prisma/client").$Enums.PaymentMethod;
    }>;
    getPaymentsSummary(branchId: number, startDate?: string, endDate?: string): Promise<{
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        chartData: {
            month: string;
            amount: number;
        }[];
    }>;
    getWithdrawals(branchId: number, query: QueryFinanceDto): Promise<{
        data: {
            id: number;
            createdAt: Date;
            branchId: number;
            description: string | null;
            date: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            createdById: number | null;
            method: import("@prisma/client").$Enums.PaymentMethod;
            category: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        totalAmount: number | import("@prisma/client/runtime/library").Decimal;
    }>;
    createWithdrawal(branchId: number, dto: CreateWithdrawalDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        branchId: number;
        description: string | null;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdById: number | null;
        method: import("@prisma/client").$Enums.PaymentMethod;
        category: string | null;
    }>;
    getWithdrawalsSummary(branchId: number, startDate?: string, endDate?: string): Promise<{
        totalWithdrawals: number | import("@prisma/client/runtime/library").Decimal;
        chartData: {
            month: string;
            amount: number;
        }[];
    }>;
    getExpenses(branchId: number, query: QueryFinanceDto): Promise<{
        data: {
            id: number;
            createdAt: Date;
            branchId: number;
            title: string;
            date: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            category: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        totalAmount: number | import("@prisma/client/runtime/library").Decimal;
    }>;
    createExpense(branchId: number, dto: CreateExpenseDto): Promise<{
        id: number;
        createdAt: Date;
        branchId: number;
        title: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
    }>;
    getExpensesSummary(branchId: number, startDate?: string, endDate?: string): Promise<{
        totalExpenses: number;
        byCategory: {
            category: string;
            amount: number;
        }[];
    }>;
    getSalaries(branchId: number, month: number, year: number): Promise<any[]>;
    calculateSalaries(branchId: number, month: number, year: number): Promise<{
        teacherId: number;
        teacherName: string;
        groups: {
            groupId: number;
            groupName: string;
            courseName: string;
            students: number;
            lessons: number;
            amount: number;
        }[];
        total: number;
    }[]>;
    paySalary(salaryId: number): Promise<{
        id: number;
        createdAt: Date;
        teacherId: number;
        groupId: number | null;
        month: number;
        year: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        isPaid: boolean;
        paidAt: Date | null;
    }>;
    getDebtors(branchId: number, query: QueryFinanceDto): Promise<{
        data: {
            id: number;
            userId: number;
            studentName: string;
            phone: string;
            balance: import("@prisma/client/runtime/library").Decimal;
            groups: {
                id: number;
                name: string;
                courseName: string;
            }[];
            lastPaymentDate: Date;
            note: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getFinanceSummary(branchId: number): Promise<{
        totalRevenue: number;
        totalWithdrawals: number;
        totalExpenses: number;
        netProfit: number;
        chartData: {
            month: string;
            revenue: number;
            expenses: number;
        }[];
    }>;
    private aggregateByMonth;
    private calculateSalariesData;
    private groupSalariesByTeacher;
}
