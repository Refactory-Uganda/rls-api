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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAttemptDto = void 0;
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QuizAttemptDto {
}
exports.QuizAttemptDto = QuizAttemptDto;
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizAttemptDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizAttemptDto.prototype, "quizId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuizAttemptDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", Number)
], QuizAttemptDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", Number)
], QuizAttemptDto.prototype, "maxScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", typeof (_a = typeof client_1.AttemptStatus !== "undefined" && client_1.AttemptStatus) === "function" ? _a : Object)
], QuizAttemptDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], QuizAttemptDto.prototype, "answers", void 0);
//# sourceMappingURL=quizAttempt.dto.js.map