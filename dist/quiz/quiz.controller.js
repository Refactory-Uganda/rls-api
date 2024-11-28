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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const swagger_1 = require("@nestjs/swagger");
const update_quiz_dto_1 = require("./dto/update-quiz.dto");
const submitAnswer_dto_1 = require("./dto/submitAnswer.dto");
const startquiz_dto_1 = require("./dto/startquiz.dto");
const submitQuiz_dto_1 = require("./dto/submitQuiz.dto");
let QuizController = class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    create(createQuizDto) {
        return this.quizService.create(createQuizDto);
    }
    async patch(id, partialUpdateDto) {
        return this.quizService.patchQuiz(id, partialUpdateDto);
    }
    remove(id) {
        return this.quizService.remove(id);
    }
    async findQuizAndQuestions(quizId) {
        return await this.quizService.findByQuizId(quizId);
    }
    findAll() {
        return this.quizService.findQuizzes();
    }
    async startQuiz(startQuizDto) {
        return await this.quizService.startQuiz(startQuizDto.quizId);
    }
    submitAnswer(attemptId, answerDto) {
        return this.quizService.submitAnswer(attemptId, answerDto);
    }
    completeQuiz(attemptId) {
        return this.quizService.completeQuiz(attemptId);
    }
    getResults(attemptId) {
        return this.quizService.getQuizResults(attemptId);
    }
    async submitQuiz(attemptId, submitQuizDto) {
        const result = await this.quizService.submitQuiz(attemptId, submitQuizDto);
        return {
            status: 'success',
            message: 'Quiz submitted successfully',
            data: result,
        };
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new quiz' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially Update Quiz' }),
    (0, swagger_1.ApiBody)({ type: update_quiz_dto_1.UpdateQuizDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Quiz' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':quizId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Quiz and its Questions' }),
    __param(0, (0, common_1.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findQuizAndQuestions", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Quizzes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a new quiz' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [startquiz_dto_1.StartQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "startQuiz", null);
__decorate([
    (0, common_1.Post)(':attemptId/answer'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit an answer' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submitAnswer_dto_1.SubmitAnswerDto]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Post)(':attemptId/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Complete a quiz' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "completeQuiz", null);
__decorate([
    (0, common_1.Get)(':attemptId/results'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quiz results' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "getResults", null);
__decorate([
    (0, common_1.Post)(':attemptId/submitQuiz'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit an entire Quiz' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Quiz submitted successfully' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submitQuiz_dto_1.SubmitQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "submitQuiz", null);
exports.QuizController = QuizController = __decorate([
    (0, common_1.Controller)('quizzes'),
    (0, swagger_1.ApiTags)('quizzes'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map