"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let LearnerService = class LearnerService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getAll() {
        const response = await this.httpService
            .get('https://rims-api-xufp.onrender.com/#/Accounts/StudentLoginController_login')
            .toPromise();
        return response.data;
    }
    async getLearner(learnerId) {
        const response = await this.httpService
            .get(`https://rims-api-xufp.onrender.com/#/Accounts/StudentLoginController_login/${learnerId}`)
            .toPromise();
        return response.data;
    }
};
exports.LearnerService = LearnerService;
exports.LearnerService = LearnerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LearnerService);
//# sourceMappingURL=learner.service.js.map