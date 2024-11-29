"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextnotesModule = void 0;
const common_1 = require("@nestjs/common");
const textnotes_service_1 = require("./textnotes.service");
const textnotes_controller_1 = require("./textnotes.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let TextnotesModule = class TextnotesModule {
};
exports.TextnotesModule = TextnotesModule;
exports.TextnotesModule = TextnotesModule = __decorate([
    (0, common_1.Module)({
        controllers: [textnotes_controller_1.NoteController],
        providers: [textnotes_service_1.NoteService, prisma_service_1.PrismaService],
    })
], TextnotesModule);
//# sourceMappingURL=textnotes.module.js.map