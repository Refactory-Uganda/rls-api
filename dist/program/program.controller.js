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
exports.ProgramController = void 0;
const common_1 = require("@nestjs/common");
const program_service_1 = require("./program.service");
const create_program_dto_1 = require("./dto/create-program.dto");
const update_program_dto_1 = require("./dto/update-program.dto");
const create_cohort_dto_1 = require("./dto/create-cohort.dto");
const swagger_1 = require("@nestjs/swagger");
let ProgramController = class ProgramController {
    constructor(programService) {
        this.programService = programService;
    }
    async createProgram(createProgramDto) {
        return this.programService.createProgram(createProgramDto);
    }
    async getAllPrograms() {
        return this.programService.getAllPrograms();
    }
    async getProgramById(id) {
        return this.programService.getProgramById(id);
    }
    async updateProgram(id, updateProgramDto) {
        return this.programService.updateProgram(id, updateProgramDto);
    }
    async updateAllProgramData(id, updateProgramDto) {
        return this.programService.updateAllProgramData(id, updateProgramDto);
    }
    async deleteProgram(id) {
        return this.programService.deleteProgram(id);
    }
    async createCohort(id, createCohortDto) {
        return this.programService.createCohort(createCohortDto, id);
    }
    async getAllCohorts() {
        return this.programService.getAllCohorts();
    }
    async getCohortsByProgramId(programId) {
        return this.programService.getCohortsByProgramId(programId);
    }
    async getCohortById(id) {
        return this.programService.getCohortById(id);
    }
};
exports.ProgramController = ProgramController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Program' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_program_dto_1.CreateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "createProgram", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Programs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getAllPrograms", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Program by Id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getProgramById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Program by Id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_program_dto_1.UpdateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "updateProgram", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update all Program data by Id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_program_dto_1.UpdateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "updateAllProgramData", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Program by Id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "deleteProgram", null);
__decorate([
    (0, common_1.Post)(':id/cohort'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Cohort under a Program' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cohort_dto_1.CreateCohortDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "createCohort", null);
__decorate([
    (0, common_1.Get)('cohorts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Cohorts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getAllCohorts", null);
__decorate([
    (0, common_1.Get)(':programId/cohorts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Cohorts under a Program' }),
    __param(0, (0, common_1.Param)('programId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getCohortsByProgramId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Cohort' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getCohortById", null);
exports.ProgramController = ProgramController = __decorate([
    (0, common_1.Controller)('programs'),
    (0, swagger_1.ApiTags)('Programs'),
    __metadata("design:paramtypes", [program_service_1.ProgramService])
], ProgramController);
//# sourceMappingURL=program.controller.js.map