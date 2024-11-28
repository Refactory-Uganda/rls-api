"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerModule = void 0;
const common_1 = require("@nestjs/common");
const learner_service_1 = require("./learner.service");
const learner_controller_1 = require("./learner.controller");
const axios_1 = require("@nestjs/axios");
let LearnerModule = class LearnerModule {
};
exports.LearnerModule = LearnerModule;
exports.LearnerModule = LearnerModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [learner_service_1.LearnerService],
        controllers: [learner_controller_1.LearnerController],
        exports: [learner_service_1.LearnerService],
    })
], LearnerModule);
//# sourceMappingURL=learner.module.js.map