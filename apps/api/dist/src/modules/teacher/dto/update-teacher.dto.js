"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeacherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_teacher_dto_1 = require("./create-teacher.dto");
class UpdateTeacherDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_teacher_dto_1.CreateTeacherDto, ['password'])) {
}
exports.UpdateTeacherDto = UpdateTeacherDto;
//# sourceMappingURL=update-teacher.dto.js.map