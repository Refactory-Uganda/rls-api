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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let ModulesService = class ModulesService {
    constructor(httpService) {
        this.httpService = httpService;
        this.baseUrl = 'https://rims-api-xufp.onrender.com/modules';
    }
    async create(createModuleDto) {
        try {
            const repsonse = await this.httpService
                .post(`${this.baseUrl}`, createModuleDto)
                .toPromise();
            return repsonse.data;
        }
        catch (error) {
            console.error('Error Message:', error.Message);
            throw new Error('no work here all wrong');
        }
    }
    async findAll() {
        const response = await this.httpService.get(`${this.baseUrl}`).toPromise();
        return response.data;
    }
    async findOne(moduleId) {
        const response = await this.httpService
            .get(`${this.baseUrl}/${moduleId}`)
            .toPromise();
        return response.data;
    }
    async update(moduleId, updateModuleDto) {
        try {
            const response = await this.httpService
                .patch(`${this.baseUrl}/${moduleId}`, updateModuleDto)
                .toPromise();
            console.log('Updating module with ID:', moduleId, 'Data:', updateModuleDto);
            return response.data;
        }
        catch (error) {
            console.error('Error Message:', error.message);
            console.error('Error Response Data:', error.response?.data || 'No response data available');
            throw new Error('Update operation failed');
        }
    }
    async remove(moduleId) {
        try {
            const response = await this.httpService
                .delete(`${this.baseUrl}/${moduleId}`)
                .toPromise();
            console.log('Deleting module with ID:', moduleId);
            return response.data;
        }
        catch (error) {
            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Unknown error occurred';
            console.error(`Delete operation error (Status: ${statusCode}):`, errorMessage);
            if (statusCode === 500) {
                throw new Error('Internal server error occurred while deleting the module.');
            }
            else {
                throw new Error(`Delete operation failed: ${errorMessage}`);
            }
        }
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], ModulesService);
//# sourceMappingURL=modules.service.js.map