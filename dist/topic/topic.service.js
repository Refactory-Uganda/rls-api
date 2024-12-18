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
exports.TopicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TopicService = class TopicService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const imageUrl = data.image ? `/uploads/topics/${data.image}` : null;
        return this.prisma.topic.create({
            data: {
                Title: data.Title,
                Description: data.Description,
                image: imageUrl,
                courseId: data.courseId,
            },
            include: {
                Course: true,
                Lesson: true,
            },
        });
    }
    async patchTopic(id, partialUpdateDto) {
        try {
            const sanitizedId = id.trim();
            if (!/^[a-fA-F0-9]{24}$/.test(sanitizedId)) {
                throw new Error(`Invalid topic ID format: ${sanitizedId}`);
            }
            const imageUrl = partialUpdateDto.image
                ? `/uploads/courses/${partialUpdateDto.image}`
                : null;
            console.log('Updating topic with ID:', sanitizedId);
            console.log('Image URL:', imageUrl);
            console.log('Partial update data:', partialUpdateDto);
            return await this.prisma.topic.update({
                where: { id: sanitizedId },
                data: {
                    Title: partialUpdateDto.Title,
                    Description: partialUpdateDto.Description,
                    image: imageUrl,
                    courseId: partialUpdateDto.courseId,
                },
            });
        }
        catch (error) {
            throw new Error(`Error partially updating topic with ID ${id}: ${error.message}`);
        }
    }
    deleteTopic(id) {
        return this.prisma.topic.delete({
            where: {
                id: id,
            },
            include: { Course: true },
        });
    }
    async findAllTopicsByCourse() {
        return this.prisma.topic.findMany({
            include: { Lesson: true },
        });
    }
    async findOneTopic(id) {
        return this.prisma.topic.findUnique({
            where: { id },
            include: { Lesson: true },
        });
    }
};
exports.TopicService = TopicService;
exports.TopicService = TopicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TopicService);
//# sourceMappingURL=topic.service.js.map