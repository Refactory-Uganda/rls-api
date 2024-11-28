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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const swagger_1 = require("@nestjs/swagger");
const update_question_dto_1 = require("./dto/update-question.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    create(createQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }
    async patch(id, partialUpdateDto) {
        return this.questionService.patchQuestion(id, partialUpdateDto);
    }
    remove(id) {
        return this.questionService.remove(id);
    }
    findAll() {
        return this.questionService.findQuestions();
    }
    findOne(question_id) {
        return this.questionService.findQuestionById(question_id);
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially Update Questions' }),
    (0, swagger_1.ApiBody)({ type: update_question_dto_1.UpdateQuestionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':question_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get question by id' }),
    __param(0, (0, common_1.Param)('question_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('questions'),
    (0, swagger_1.ApiTags)('questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map