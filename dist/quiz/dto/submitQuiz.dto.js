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
exports.SubmitQuizDto = void 0;
const class_validator_1 = require("class-validator");
const submitAnswer_dto_1 = require("./submitAnswer.dto");
const swagger_1 = require("@nestjs/swagger");
class SubmitQuizDto {
}
exports.SubmitQuizDto = SubmitQuizDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SubmitQuizDto.prototype, "quizId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitQuizDto.prototype, "attemptId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, swagger_1.ApiProperty)({ type: [submitAnswer_dto_1.SubmitAnswerDto],
        description: 'The topics of the course'
    }),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], SubmitQuizDto.prototype, "answers", void 0);
//# sourceMappingURL=submitQuiz.dto.js.map