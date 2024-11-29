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
exports.SlideService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SlideService = class SlideService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkLessonExists(lessonId) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID '${lessonId}' not found.`);
        }
    }
    async create(createSlideDto) {
        await this.checkLessonExists(createSlideDto.lessonId);
        return this.prisma.slide.create({
            data: createSlideDto,
        });
    }
    async findAllByLesson(lessonId) {
        await this.checkLessonExists(lessonId);
        return this.prisma.slide.findMany({
            where: { lessonId },
        });
    }
    async findOne(id) {
        const slide = await this.prisma.slide.findUnique({
            where: { id },
        });
        if (!slide) {
            throw new common_1.NotFoundException(`Slide with ID '${id}' not found.`);
        }
        return slide;
    }
    async update(id, updateSlideDto) {
        const slide = await this.prisma.slide.findUnique({
            where: { id },
        });
        if (!slide) {
            throw new common_1.NotFoundException(`Slide with ID '${id}' not found.`);
        }
        return this.prisma.slide.update({
            where: { id },
            data: updateSlideDto,
        });
    }
    async delete(id) {
        const slide = await this.prisma.slide.findUnique({
            where: { id },
        });
        if (!slide) {
            throw new common_1.NotFoundException(`Slide with ID '${id}' not found.`);
        }
        return this.prisma.slide.delete({
            where: { id },
        });
    }
};
exports.SlideService = SlideService;
exports.SlideService = SlideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SlideService);
//# sourceMappingURL=slide.service.js.map