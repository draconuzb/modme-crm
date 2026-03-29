export declare class CreatePaymentDto {
    studentId: number;
    amount: number;
    method: 'CASH' | 'CARD' | 'TRANSFER';
    description?: string;
    date?: string;
}
