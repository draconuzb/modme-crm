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
exports.ReminderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reminder_service_1 = require("./reminder.service");
const create_reminder_dto_1 = require("./dto/create-reminder.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_branch_decorator_1 = require("../../common/decorators/current-branch.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ReminderController = class ReminderController {
    constructor(reminderService) {
        this.reminderService = reminderService;
    }
    findAll(branchId) {
        return this.reminderService.findAll(branchId);
    }
    create(branchId, user, dto) {
        return this.reminderService.create(branchId, dto, user.id);
    }
    complete(id, note) {
        return this.reminderService.complete(id, note);
    }
    remove(id) {
        return this.reminderService.delete(id);
    }
};
exports.ReminderController = ReminderController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List reminders grouped by overdue/today/future' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReminderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a reminder' }),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, create_reminder_dto_1.CreateReminderDto]),
    __metadata("design:returntype", void 0)
], ReminderController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark reminder as completed' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('note')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ReminderController.prototype, "complete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a reminder' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReminderController.prototype, "remove", null);
exports.ReminderController = ReminderController = __decorate([
    (0, swagger_1.ApiTags)('Reminders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({ name: 'x-branch-id', required: false, description: 'Branch ID' }),
    (0, common_1.Controller)('reminders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [reminder_service_1.ReminderService])
], ReminderController);
//# sourceMappingURL=reminder.controller.js.map