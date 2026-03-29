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
exports.VoipController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voip_service_1 = require("./voip.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_branch_decorator_1 = require("../../common/decorators/current-branch.decorator");
let VoipController = class VoipController {
    constructor(voipService) {
        this.voipService = voipService;
    }
    getCalls(branchId, page, limit, startDate, endDate, direction, studentId) {
        return this.voipService.getCalls(branchId, {
            page: page ? +page : undefined,
            limit: limit ? +limit : undefined,
            startDate,
            endDate,
            direction,
            studentId: studentId ? +studentId : undefined,
        });
    }
    createCall(body) {
        return this.voipService.createCall(body);
    }
};
exports.VoipController = VoipController;
__decorate([
    (0, common_1.Get)('calls'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({ name: 'x-branch-id', required: false, description: 'Branch ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get call history with filters' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __param(5, (0, common_1.Query)('direction')),
    __param(6, (0, common_1.Query)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String, String, Number]),
    __metadata("design:returntype", void 0)
], VoipController.prototype, "getCalls", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, swagger_1.ApiOperation)({ summary: 'Webhook for external VoIP system to create call records' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VoipController.prototype, "createCall", null);
exports.VoipController = VoipController = __decorate([
    (0, swagger_1.ApiTags)('VoIP'),
    (0, common_1.Controller)('voip'),
    __metadata("design:paramtypes", [voip_service_1.VoipService])
], VoipController);
//# sourceMappingURL=voip.controller.js.map