export declare class CreateWithdrawalDto {
    amount: number;
    method: 'CASH' | 'CARD' | 'TRANSFER';
    description?: string;
    category?: string;
    date?: string;
}
