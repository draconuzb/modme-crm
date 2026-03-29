"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoipModule = void 0;
const common_1 = require("@nestjs/common");
const voip_controller_1 = require("./voip.controller");
const voip_service_1 = require("./voip.service");
let VoipModule = class VoipModule {
};
exports.VoipModule = VoipModule;
exports.VoipModule = VoipModule = __decorate([
    (0, common_1.Module)({
        controllers: [voip_controller_1.VoipController],
        providers: [voip_service_1.VoipService],
        exports: [voip_service_1.VoipService],
    })
], VoipModule);
//# sourceMappingURL=voip.module.js.map