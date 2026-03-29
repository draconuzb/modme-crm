"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const branch_module_1 = require("./modules/branch/branch.module");
const user_module_1 = require("./modules/user/user.module");
const teacher_module_1 = require("./modules/teacher/teacher.module");
const student_module_1 = require("./modules/student/student.module");
const group_module_1 = require("./modules/group/group.module");
const course_module_1 = require("./modules/course/course.module");
const lead_module_1 = require("./modules/lead/lead.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const finance_module_1 = require("./modules/finance/finance.module");
const reminder_module_1 = require("./modules/reminder/reminder.module");
const rating_module_1 = require("./modules/rating/rating.module");
const report_module_1 = require("./modules/report/report.module");
const gamification_module_1 = require("./modules/gamification/gamification.module");
const sms_module_1 = require("./modules/sms/sms.module");
const voip_module_1 = require("./modules/voip/voip.module");
const room_module_1 = require("./modules/room/room.module");
const tag_module_1 = require("./modules/tag/tag.module");
const grade_module_1 = require("./modules/grade/grade.module");
const exam_module_1 = require("./modules/exam/exam.module");
const form_module_1 = require("./modules/form/form.module");
const blog_module_1 = require("./modules/blog/blog.module");
const holiday_module_1 = require("./modules/holiday/holiday.module");
const schedule_module_1 = require("./modules/schedule/schedule.module");
const settings_module_1 = require("./modules/settings/settings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            branch_module_1.BranchModule,
            user_module_1.UserModule,
            teacher_module_1.TeacherModule,
            student_module_1.StudentModule,
            group_module_1.GroupModule,
            course_module_1.CourseModule,
            lead_module_1.LeadModule,
            attendance_module_1.AttendanceModule,
            finance_module_1.FinanceModule,
            reminder_module_1.ReminderModule,
            rating_module_1.RatingModule,
            report_module_1.ReportModule,
            gamification_module_1.GamificationModule,
            sms_module_1.SmsModule,
            voip_module_1.VoipModule,
            room_module_1.RoomModule,
            tag_module_1.TagModule,
            grade_module_1.GradeModule,
            exam_module_1.ExamModule,
            form_module_1.FormModule,
            blog_module_1.BlogModule,
            holiday_module_1.HolidayModule,
            schedule_module_1.ScheduleModule,
            settings_module_1.SettingsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map