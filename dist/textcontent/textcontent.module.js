"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextContentModule = void 0;
const common_1 = require("@nestjs/common");
const textcontent_service_1 = require("./textcontent.service");
const textcontent_controller_1 = require("./textcontent.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let TextContentModule = class TextContentModule {
};
exports.TextContentModule = TextContentModule;
exports.TextContentModule = TextContentModule = __decorate([
    (0, common_1.Module)({
        controllers: [textcontent_controller_1.TextContentController],
        providers: [textcontent_service_1.TextContentService, prisma_service_1.PrismaService],
    })
], TextContentModule);
//# sourceMappingURL=textcontent.module.js.map