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
exports.SubHeadingController = void 0;
const common_1 = require("@nestjs/common");
const subheading_service_1 = require("./subheading.service");
const create_sub_heading_dto_1 = require("./dto/create-sub-heading.dto");
const swagger_1 = require("@nestjs/swagger");
const update_subheading_dto_1 = require("./dto/update-subheading.dto");
let SubHeadingController = class SubHeadingController {
    constructor(subHeadingService) {
        this.subHeadingService = subHeadingService;
    }
    create(createSubHeadingDto) {
        return this.subHeadingService.create(createSubHeadingDto);
    }
    async update(updateSubheadingDto, subheading_id) {
        return this.subHeadingService.updateSubheading(subheading_id, updateSubheadingDto);
    }
    async patch(subheading_id, partialUpdateDto) {
        return this.subHeadingService.updateSubheading(subheading_id, partialUpdateDto);
    }
    remove(id) {
        return this.subHeadingService.remove(id);
    }
};
exports.SubHeadingController = SubHeadingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'create subheader' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_heading_dto_1.CreateSubHeadingDto]),
    __metadata("design:returntype", void 0)
], SubHeadingController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':subheading_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update subheading' }),
    (0, swagger_1.ApiBody)({ type: update_subheading_dto_1.UpdateSubheadingDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('subheading_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subheading_dto_1.UpdateSubheadingDto, String]),
    __metadata("design:returntype", Promise)
], SubHeadingController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':subheading_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Patch subheading' }),
    (0, swagger_1.ApiBody)({ type: update_subheading_dto_1.UpdateSubheadingDto }),
    __param(0, (0, common_1.Param)('subheading_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubHeadingController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'delete a particular subheader' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubHeadingController.prototype, "remove", null);
exports.SubHeadingController = SubHeadingController = __decorate([
    (0, common_1.Controller)('sub-headings'),
    (0, swagger_1.ApiTags)('textContent SubHeader'),
    __metadata("design:paramtypes", [subheading_service_1.SubHeadingService])
], SubHeadingController);
//# sourceMappingURL=subheading.controller.js.map