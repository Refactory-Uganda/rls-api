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
exports.OptionController = void 0;
const common_1 = require("@nestjs/common");
const option_service_1 = require("./option.service");
const option_dto_1 = require("./dto/option.dto");
const swagger_1 = require("@nestjs/swagger");
const update_option_dto_1 = require("./dto/update-option.dto");
let OptionController = class OptionController {
    constructor(optionService) {
        this.optionService = optionService;
    }
    create(createOptionDto) {
        return this.optionService.create(createOptionDto);
    }
    findAll() {
        return this.optionService.findAll();
    }
    findOne(optionId) {
        return this.optionService.findOptionById(optionId);
    }
    async patchOption(id, partialUpdateDto) {
        return await this.optionService.patchOption(id, partialUpdateDto);
    }
    remove(id) {
        return this.optionService.remove(id);
    }
};
exports.OptionController = OptionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create option' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [option_dto_1.CreateOptionDto]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all options' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':option_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get option by id' }),
    __param(0, (0, common_1.Param)('option_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update option' }),
    (0, swagger_1.ApiBody)({ type: update_option_dto_1.UpdateOptionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "patchOption", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete option' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "remove", null);
exports.OptionController = OptionController = __decorate([
    (0, common_1.Controller)('options'),
    (0, swagger_1.ApiTags)('options'),
    __metadata("design:paramtypes", [option_service_1.OptionService])
], OptionController);
//# sourceMappingURL=option.controller.js.map