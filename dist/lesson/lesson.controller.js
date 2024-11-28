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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_service_1 = require("./lesson.service");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const update_lesson_dto_1 = require("../lesson/dto/update-lesson.dto");
let LessonController = class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    async createLesson(topic_id, createLessonDto) {
        return this.lessonService.createNew(createLessonDto);
    }
    async patch(id, partialUpdateDto) {
        return this.lessonService.patchLesson(id, partialUpdateDto);
    }
    async deleteLesson(lesson_id) {
        return this.lessonService.deleteLesson(lesson_id);
    }
    async findAllLessons() {
        return await this.lessonService.findAllLessons();
    }
    async findLessonById(lessonId) {
        return await this.lessonService.findLessonById(lessonId);
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, common_1.Post)(':topic_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Lesson' }),
    __param(0, (0, common_1.Param)('topic_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially Update Lesson' }),
    (0, swagger_1.ApiBody)({ type: update_lesson_dto_1.UpdateLessonDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':lesson_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Lesson' }),
    __param(0, (0, common_1.Param)('lesson_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Lessons under different topics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "findAllLessons", null);
__decorate([
    (0, common_1.Get)(':lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a particular Lesson under a specific Topic' }),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "findLessonById", null);
exports.LessonController = LessonController = __decorate([
    (0, common_1.Controller)('lesson'),
    (0, swagger_1.ApiTags)('Lessons'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map