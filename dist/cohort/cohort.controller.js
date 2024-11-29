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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortController = void 0;
const common_1 = require("@nestjs/common");
const cohort_service_1 = require("./cohort.service");
const create_cohortModule_dto_1 = require("../modules/dto/create-cohortModule.dto");
const update_cohort_dto_1 = require("../modules/dto/update-cohort.dto");
const swagger_1 = require("@nestjs/swagger");
let CohortController = class CohortController {
    constructor(cohortService) {
        this.cohortService = cohortService;
    }
    async getAllCohorts() {
        try {
            const cohorts = await this.cohortService.getAllCohorts();
            return cohorts;
        }
        catch (error) {
            throw new common_1.HttpException(`Error fetching cohorts: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCohortById(cohortId) {
        const moduleData = {};
        try {
            const cohort = await this.cohortService.getModuleById(cohortId, moduleData);
            if (!cohort) {
                throw new common_1.HttpException('Cohort not found', common_1.HttpStatus.NOT_FOUND);
            }
            return cohort;
        }
        catch (error) {
            throw new common_1.HttpException(`Error fetching cohort: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createCohortModule(cohortId, createCohortModuleDto) {
        try {
            const newCohortModule = await this.cohortService.createCohortModule(cohortId, createCohortModuleDto);
            console.log('I am running');
            return {
                message: 'Cohort module created successfully',
                cohort: newCohortModule,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Error creating cohort module: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateCohort(cohortId, updateCohortDto) {
        try {
            const updatedCohort = await this.cohortService.updateCohort(cohortId, updateCohortDto);
            if (!updatedCohort) {
                throw new common_1.HttpException('Cohort not found', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Cohort updated successfully', cohort: updatedCohort };
        }
        catch (error) {
            throw new common_1.HttpException(`Error updating cohort: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async patchCohort(cohortId, partialUpdateDto) {
        try {
            const patchedCohort = await this.cohortService.patchCohort(cohortId, partialUpdateDto);
            if (!patchedCohort) {
                throw new common_1.HttpException('Cohort not found', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Cohort patched successfully', cohort: patchedCohort };
        }
        catch (error) {
            throw new common_1.HttpException(`Error patching cohort: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteCohort(cohortId) {
        try {
            const deleted = await this.cohortService.deleteCohort(cohortId);
            if (!deleted) {
                throw new common_1.HttpException('Cohort not found', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Cohort deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(`Error deleting cohort: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CohortController = CohortController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: ' Get All Cohorts ' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CohortController.prototype, "getAllCohorts", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: ' Get Cohort by ID ' }),
    __param(0, (0, common_1.Param)('cohortId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CohortController.prototype, "getCohortById", null);
__decorate([
    (0, common_1.Post)('cohortId/modules'),
    (0, swagger_1.ApiOperation)({ summary: ' Create Cohort Module ' }),
    __param(0, (0, common_1.Param)('cohortId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cohortModule_dto_1.CreateCohortModuleDto]),
    __metadata("design:returntype", Promise)
], CohortController.prototype, "createCohortModule", null);
__decorate([
    (0, common_1.Put)('cohortId'),
    (0, swagger_1.ApiOperation)({ summary: ' Update Cohort ' }),
    __param(0, (0, common_1.Param)('cohortId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cohort_dto_1.UpdateCohortDto]),
    __metadata("design:returntype", Promise)
], CohortController.prototype, "updateCohort", null);
__decorate([
    (0, common_1.Patch)(':cohortId'),
    (0, swagger_1.ApiOperation)({ summary: ' Partially Update Cohort' }),
    __param(0, (0, common_1.Param)('cohortId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CohortController.prototype, "patchCohort", null);
__decorate([
    (0, common_1.Delete)(':cohortId'),
    (0, swagger_1.ApiOperation)({ summary: ' Delete a Cohort ' }),
    __param(0, (0, common_1.Param)('cohortId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CohortController.prototype, "deleteCohort", null);
exports.CohortController = CohortController = __decorate([
    (0, common_1.Controller)('cohorts'),
    (0, swagger_1.ApiTags)('Cohort'),
    __metadata("design:paramtypes", [cohort_service_1.CohortService])
], CohortController);
//# sourceMappingURL=cohort.controller.js.map