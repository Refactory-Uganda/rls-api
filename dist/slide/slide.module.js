"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideModule = void 0;
const common_1 = require("@nestjs/common");
const slide_service_1 = require("./slide.service");
const slide_controller_1 = require("./slide.controller");
let SlideModule = class SlideModule {
};
exports.SlideModule = SlideModule;
exports.SlideModule = SlideModule = __decorate([
    (0, common_1.Module)({
        providers: [slide_service_1.SlideService],
        controllers: [slide_controller_1.SlideController],
    })
], SlideModule);
//# sourceMappingURL=slide.module.js.map