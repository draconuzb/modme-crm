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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_branch_decorator_1 = require("../../common/decorators/current-branch.decorator");
const bulk_attendance_dto_1 = require("./dto/bulk-attendance.dto");
const query_attendance_dto_1 = require("./dto/query-attendance.dto");
const mark_teacher_attendance_dto_1 = require("./dto/mark-teacher-attendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    bulkMark(dto) {
        return this.attendanceService.bulkMark(dto);
    }
    getReport(branchId, query) {
        return this.attendanceService.getReport(branchId, query);
    }
    getStudentAttendance(studentId, month, year) {
        return this.attendanceService.getStudentAttendance(studentId, +month, +year);
    }
    getGroupMonthlyAttendance(groupId, month, year) {
        return this.attendanceService.getGroupMonthlyAttendance(groupId, +month, +year);
    }
    getTeacherAttendance(branchId, month, year) {
        return this.attendanceService.getTeacherAttendance(branchId, +month, +year);
    }
    markTeacherAttendance(dto) {
        return this.attendanceService.markTeacherAttendance(dto);
    }
    getTeacherWorkSchedule(teacherId) {
        return this.attendanceService.getTeacherWorkSchedule(teacherId);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_attendance_dto_1.BulkAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "bulkMark", null);
__decorate([
    (0, common_1.Get)('report'),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_attendance_dto_1.QueryAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getStudentAttendance", null);
__decorate([
    (0, common_1.Get)('group/:groupId'),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getGroupMonthlyAttendance", null);
__decorate([
    (0, common_1.Get)('teachers'),
    __param(0, (0, current_branch_decorator_1.CurrentBranch)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getTeacherAttendance", null);
__decorate([
    (0, common_1.Post)('teachers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_teacher_attendance_dto_1.MarkTeacherAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "markTeacherAttendance", null);
__decorate([
    (0, common_1.Get)('teachers/:teacherId/schedule'),
    __param(0, (0, common_1.Param)('teacherId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getTeacherWorkSchedule", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map