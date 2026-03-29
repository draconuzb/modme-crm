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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const report_service_1 = require("./report.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_branch_decorator_1 = require("../../common/decorators/current-branch.decorator");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    getDashboardStats(branchId) {
        return this.reportService.getDashboardStats(branchId);
    }
    getDashboardRevenue(branchId, months) {
        return this.reportService.getRevenueChart(branchId, months ? parseInt(months, 10) : 12);
    }
    getConversion(branchId, startDate, endDate, source, staffId) {
        return this.reportService.getConversionReport(branchId, startDate, endDate, source, staffId ? parseInt(staffId, 10) : undefined);
    }
    getStudentsLeft(branchId) {
        return this.reportService.getStudentsLeft(branchId);
    }
    getLogs(branchId, page, limit) {
        return this.reportService.getLogs(branchId, page ? parseInt(page, 10) : 1, limit ? parseInt(limit, 10) : 50);
    }
    getAttendance() {
        return this.reportService.getAttendance();
    }
    getLeads() {
        return this.reportService.getLeads();
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Dashboard statistics' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('dashboard/revenue'),
    (0, swagger_1.ApiOperation)({ summary: 'Monthly revenue chart data' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('months')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getDashboardRevenue", null);
__decorate([
    (0, common_1.Get)('conversion'),
    (0, swagger_1.ApiOperation)({ summary: 'Lead conversion funnel report' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('source')),
    __param(4, (0, common_1.Query)('staffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getConversion", null);
__decorate([
    (0, common_1.Get)('students-left'),
    (0, swagger_1.ApiOperation)({ summary: 'Students who left active groups' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getStudentsLeft", null);
__decorate([
    (0, common_1.Get)('logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Audit logs (paginated)' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('attendance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Get)('leads'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getLeads", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({ name: 'x-branch-id', required: false, description: 'Branch ID' }),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map