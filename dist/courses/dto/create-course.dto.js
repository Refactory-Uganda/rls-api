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
exports.CreateCourseDto = exports.CreateTopicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_lesson_dto_1 = require("../../lesson/dto/create-lesson.dto");
class CreateTopicDto {
}
exports.CreateTopicDto = CreateTopicDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateTopicDto.prototype, "s", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the topic',
        example: 'Introduction to JavaScript',
    }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "Title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'The description of the topic',
        example: 'This topic is an introduction to JavaScript',
    }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "Description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [create_lesson_dto_1.CreateLessonDto],
        description: 'The lessons of the topic',
        example: 'Lesson 1: DataTypes',
    }),
    __metadata("design:type", Array)
], CreateTopicDto.prototype, "lessons", void 0);
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Course ID (optional)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The title of the course',
        example: 'Introduction to Programming',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "Title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'The description of the course',
        example: 'This course is an introduction to programming',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "Description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The duration of the course',
        example: '6 weeks',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "Duration", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value))
            return value;
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean);
        }
    }),
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: 'The course outline as an array of strings',
        example: ['Introduction', 'Basic Concepts', 'Advanced Topics'],
    }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "courseOutline", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value))
            return value;
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean);
        }
    }),
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: 'The requirements as an array of strings',
        example: ['Laptop', 'Headsets', 'notebook'],
    }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "requirements", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_2.AssessmentMode),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'The assessment mode for the course',
        enum: client_2.AssessmentMode,
        example: 'QUIZ | ASSIGNMENT',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "assessmentMode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'The facilitator (User)',
        example: 'facilitator',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "facilitator", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.CourseStatus),
    (0, swagger_1.ApiProperty)({
        description: 'The status of the course',
        example: 'DRAFT | PUBLISHED | DELETED',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'The award or certification given upon completion',
        example: 'Certificate of Completion',
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "award", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value))
            return value;
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean);
        }
    }),
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: 'The course objective as an array of strings',
        example: ['Introduction', 'Basic Concepts', 'Advanced Topics'],
    }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "courseObjective", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "image", void 0);
//# sourceMappingURL=create-course.dto.js.map