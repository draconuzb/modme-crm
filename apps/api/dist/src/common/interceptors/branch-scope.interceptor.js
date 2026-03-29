"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchScopeInterceptor = void 0;
const common_1 = require("@nestjs/common");
let BranchScopeInterceptor = class BranchScopeInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const branchIdHeader = request.headers['x-branch-id'];
        if (branchIdHeader) {
            request.branchId = parseInt(branchIdHeader, 10);
        }
        else {
            const userRole = request.user?.role;
            if (userRole === 'CEO') {
                request.branchId = null;
            }
            else {
                throw new common_1.ForbiddenException('x-branch-id header is required for non-CEO users');
            }
        }
        return next.handle();
    }
};
exports.BranchScopeInterceptor = BranchScopeInterceptor;
exports.BranchScopeInterceptor = BranchScopeInterceptor = __decorate([
    (0, common_1.Injectable)()
], BranchScopeInterceptor);
//# sourceMappingURL=branch-scope.interceptor.js.map