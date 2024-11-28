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
exports.TextContentController = void 0;
const common_1 = require("@nestjs/common");
const textcontent_service_1 = require("./textcontent.service");
const create_text_content_dto_1 = require("./dto/create-text-content.dto");
const swagger_1 = require("@nestjs/swagger");
const update_textcontent_dto_1 = require("./dto/update-textcontent.dto");
let TextContentController = class TextContentController {
    constructor(textContentService) {
        this.textContentService = textContentService;
    }
    async create(createTextContentDto) {
        return this.textContentService.createNew(createTextContentDto);
    }
    async update(updateTextContentDto, textcontent_id) {
        return this.textContentService.updateTextContent(textcontent_id, updateTextContentDto);
    }
    async patch(textcontent_id, partialUpdateDto) {
        return this.textContentService.patchTextContent(textcontent_id, partialUpdateDto);
    }
};
exports.TextContentController = TextContentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create textcontent' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_text_content_dto_1.CreateTextContentDto]),
    __metadata("design:returntype", Promise)
], TextContentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':textcontent_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update textcontent' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('textcontent_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_textcontent_dto_1.UpdateTextContentDto, String]),
    __metadata("design:returntype", Promise)
], TextContentController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':textcontent_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Patch textcontent' }),
    (0, swagger_1.ApiBody)({ type: update_textcontent_dto_1.UpdateTextContentDto }),
    __param(0, (0, common_1.Param)('textcontent_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TextContentController.prototype, "patch", null);
exports.TextContentController = TextContentController = __decorate([
    (0, common_1.Controller)('text_content'),
    (0, swagger_1.ApiTags)('textcontent'),
    __metadata("design:paramtypes", [textcontent_service_1.TextContentService])
], TextContentController);
//# sourceMappingURL=textcontent.controller.js.map