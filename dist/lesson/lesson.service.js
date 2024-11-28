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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonService = class LessonService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNew(createLessonDto) {
        const lesson = await this.prisma.lesson.create({
            data: {
                title: createLessonDto.title,
                topicId: createLessonDto.topicId,
                text: createLessonDto.text
            },
            include: {
                topic: true
            }
        });
        return lesson;
    }
    async patchLesson(id, partialUpdateDto) {
        try {
            const updateData = {
                title: partialUpdateDto.title,
                text: partialUpdateDto.text,
                topic: partialUpdateDto.topicId ? { connect: { id: partialUpdateDto.topicId } } : undefined,
            };
            return await this.prisma.lesson.update({
                where: { id },
                data: updateData,
                include: { topic: true },
            });
        }
        catch (error) {
            throw new Error(`Error partially updating lesson with ID ${id}: ${error.message}`);
        }
    }
    async deleteLesson(id) {
        const lesson = await this.prisma.lesson.delete({
            where: {
                id
            }
        });
        return lesson;
    }
    async findAllLessons() {
        return this.prisma.lesson.findMany({
            include: { quiz: {
                    include: {
                        questions: {
                            include: {
                                option: true,
                                userAnswers: true,
                            },
                        },
                        attempts: true,
                    },
                } }
        });
    }
    async findLessonById(lessonId) {
        return this.prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
            include: {
                quiz: {
                    include: {
                        questions: {
                            include: {
                                option: true,
                                userAnswers: true,
                            },
                        },
                        attempts: true,
                    },
                }
            },
        });
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonService);
//# sourceMappingURL=lesson.service.js.map