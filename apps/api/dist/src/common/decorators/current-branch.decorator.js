"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentBranch = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentBranch = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return parseInt(request.headers['x-branch-id'] || '0', 10);
});
//# sourceMappingURL=current-branch.decorator.js.map