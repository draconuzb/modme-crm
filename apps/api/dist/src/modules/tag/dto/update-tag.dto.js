"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTagDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_tag_dto_1 = require("./create-tag.dto");
class UpdateTagDto extends (0, swagger_1.PartialType)(create_tag_dto_1.CreateTagDto) {
}
exports.UpdateTagDto = UpdateTagDto;
//# sourceMappingURL=update-tag.dto.js.map