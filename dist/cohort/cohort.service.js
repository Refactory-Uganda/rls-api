"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let CohortService = class CohortService {
    async getAllCohorts() {
        try {
            const response = await axios_1.default.get('http://localhost:3001/cohorts');
            return response.data;
        }
        catch (error) {
            throw new Error(`Error fetching cohorts: ${error.message}`);
        }
    }
    async getModuleById(cohortId, moduleData) {
        try {
            const response = await axios_1.default.get(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}/modules/`, moduleData);
            return response.data;
        }
        catch (error) {
            throw new Error(`Error fetching module: ${error.message}`);
        }
    }
    async updateCohort(cohortId, updateData) {
        try {
            const response = await axios_1.default.put(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}`, updateData);
            return response.data;
        }
        catch (error) {
            throw new Error(`Error updating cohort with PUT: ${error.message}`);
        }
    }
    async patchCohort(cohortId, updateData) {
        try {
            const response = await axios_1.default.patch(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}`, updateData);
            return response.data;
        }
        catch (error) {
            throw new Error(`Error updating cohort with PATCH: ${error.message}`);
        }
    }
    async deleteCohort(cohortId) {
        try {
            const response = await axios_1.default.delete(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}`);
            return response.data;
        }
        catch (error) {
            throw new Error(`Error deleting cohort: ${error.message}`);
        }
    }
    async createCohortModule(cohortId, createCohortModuleDto) {
        try {
            const response = await axios_1.default.post(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}/modules/`, {
                data: JSON.stringify(createCohortModuleDto),
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Error creating cohort module: ${error.message}`);
        }
    }
};
exports.CohortService = CohortService;
exports.CohortService = CohortService = __decorate([
    (0, common_1.Injectable)()
], CohortService);
//# sourceMappingURL=cohort.service.js.map