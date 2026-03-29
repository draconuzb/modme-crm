"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const finance_service_1 = require("./finance.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const create_withdrawal_dto_1 = require("./dto/create-withdrawal.dto");
const create_expense_dto_1 = require("./dto/create-expense.dto");
const query_finance_dto_1 = require("./dto/query-finance.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_branch_decorator_1 = require("../../common/decorators/current-branch.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let FinanceController = class FinanceController {
    constructor(financeService) {
        this.financeService = financeService;
    }
    getPayments(branchId, query) {
        return this.financeService.getPayments(branchId, query);
    }
    createPayment(branchId, dto, user) {
        return this.financeService.createPayment(branchId, dto, user.id);
    }
    getPaymentsSummary(branchId, startDate, endDate) {
        return this.financeService.getPaymentsSummary(branchId, startDate, endDate);
    }
    getWithdrawals(branchId, query) {
        return this.financeService.getWithdrawals(branchId, query);
    }
    createWithdrawal(branchId, dto, user) {
        return this.financeService.createWithdrawal(branchId, dto, user.id);
    }
    getWithdrawalsSummary(branchId, startDate, endDate) {
        return this.financeService.getWithdrawalsSummary(branchId, startDate, endDate);
    }
    getExpenses(branchId, query) {
        return this.financeService.getExpenses(branchId, query);
    }
    createExpense(branchId, dto) {
        return this.financeService.createExpense(branchId, dto);
    }
    getExpensesSummary(branchId, startDate, endDate) {
        return this.financeService.getExpensesSummary(branchId, startDate, endDate);
    }
    getSalaries(branchId, month, year) {
        return this.financeService.getSalaries(branchId, month, year);
    }
    calculateSalaries(branchId, month, year) {
        return this.financeService.calculateSalaries(branchId, month, year);
    }
    paySalary(id) {
        return this.financeService.paySalary(id);
    }
    getDebtors(branchId, query) {
        return this.financeService.getDebtors(branchId, query);
    }
    getSummary(branchId) {
        return this.financeService.getFinanceSummary(branchId);
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)('payments'),
    (0, swagger_1.ApiOperation)({ summary: 'List payments with filters' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_finance_dto_1.QueryFinanceDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getPayments", null);
__decorate([
    (0, common_1.Post)('payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a payment' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_payment_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('payments/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Revenue summary with chart data' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getPaymentsSummary", null);
__decorate([
    (0, common_1.Get)('withdrawals'),
    (0, swagger_1.ApiOperation)({ summary: 'List withdrawals with filters' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_finance_dto_1.QueryFinanceDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getWithdrawals", null);
__decorate([
    (0, common_1.Post)('withdrawals'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a withdrawal' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_withdrawal_dto_1.CreateWithdrawalDto, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createWithdrawal", null);
__decorate([
    (0, common_1.Get)('withdrawals/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Withdrawals summary with chart data' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getWithdrawalsSummary", null);
__decorate([
    (0, common_1.Get)('expenses'),
    (0, swagger_1.ApiOperation)({ summary: 'List expenses with filters' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_finance_dto_1.QueryFinanceDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getExpenses", null);
__decorate([
    (0, common_1.Post)('expenses'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an expense' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_expense_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('expenses/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Expenses summary by category' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getExpensesSummary", null);
__decorate([
    (0, common_1.Get)('salaries'),
    (0, swagger_1.ApiOperation)({ summary: 'Get calculated teacher salaries' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getSalaries", null);
__decorate([
    (0, common_1.Post)('salaries/calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate and save teacher salaries' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Body)('month')),
    __param(2, (0, common_1.Body)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "calculateSalaries", null);
__decorate([
    (0, common_1.Patch)('salaries/:id/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark salary as paid' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "paySalary", null);
__decorate([
    (0, common_1.Get)('debtors'),
    (0, swagger_1.ApiOperation)({ summary: 'List students with debt' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_finance_dto_1.QueryFinanceDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getDebtors", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Overall finance summary' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getSummary", null);
exports.FinanceController = FinanceController = __decorate([
    (0, swagger_1.ApiTags)('Finance'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({ name: 'x-branch-id', required: false, description: 'Branch ID' }),
    (0, common_1.Controller)('finance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map