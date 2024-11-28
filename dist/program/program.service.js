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
exports.ProgramService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let ProgramService = class ProgramService {
    constructor(httpService) {
        this.httpService = httpService;
        this.baseUrl = 'https://rims-api-xufp.onrender.com';
    }
    async createProgram(createProgramDto) {
        const url = `${this.baseUrl}/programs`;
        try {
            const response = await this.httpService.post(url, createProgramDto).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to create program at ${url}:`, error.message);
            throw new Error('Failed to create program');
        }
    }
    async getAllPrograms() {
        const url = `${this.baseUrl}/programs`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to fetch programs from ${url}:`, error.message);
            throw new Error('Failed to retrieve programs');
        }
    }
    async getProgramById(id) {
        const url = `${this.baseUrl}/programs/${id}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to fetch program with id ${id} from ${url}:`, error.message);
            throw new Error('Failed to retrieve program');
        }
    }
    async updateProgram(id, updateProgramDto) {
        const url = `${this.baseUrl}/programs/${id}`;
        try {
            const response = await this.httpService.patch(url, updateProgramDto).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to update program with id ${id} at ${url}:`, error.message);
            throw new Error('Failed to update program');
        }
    }
    async updateAllProgramData(id, updateProgramDto) {
        const url = `${this.baseUrl}/programs/${id}`;
        try {
            const response = await this.httpService.put(url, updateProgramDto).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to update all data for program with id ${id} at ${url}:`, error.message);
            throw new Error('Failed to update program data');
        }
    }
    async deleteProgram(id) {
        const url = `${this.baseUrl}/programs/${id}`;
        try {
            const response = await this.httpService.delete(url).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to delete program with id ${id} at ${url}:`, error.message);
            throw new Error('Failed to delete program');
        }
    }
    async createCohort(createCohortDto, id) {
        const url = `${this.baseUrl}/cohorts`;
        const cohortData = {
            ...createCohortDto,
            id,
        };
        try {
            const response = await this.httpService.post(url, cohortData).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to create cohort at ${url}:`, error.message);
            throw new Error('Failed to create cohort');
        }
    }
    async getAllCohorts() {
        const url = `${this.baseUrl}/programs/cohorts`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to fetch cohorts from ${url}:`, error.message);
            throw new Error('Failed to retrieve cohorts');
        }
    }
    async getCohortsByProgramId(ProgramId) {
        const url = `${this.baseUrl}/programs/${ProgramId}/cohorts`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to fetch cohorts for program with id ${ProgramId} from ${url}:`, error.message);
            throw new Error('Failed to retrieve cohorts for program');
        }
    }
    async getCohortById(id) {
        const url = `${this.baseUrl}/cohorts/${id}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (error) {
            console.error(`Failed to fetch cohort with id ${id} from ${url}:`, error.message);
            throw new Error('Failed to retrieve cohort');
        }
    }
};
exports.ProgramService = ProgramService;
exports.ProgramService = ProgramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ProgramService);
//# sourceMappingURL=program.service.js.map