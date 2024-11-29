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
exports.TextContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TextContentService = class TextContentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNew(dto) {
        const text = await this.prisma.textContent.create({
            data: {
                heading: dto.heading,
                lessonId: dto.lessonId,
            },
        });
        return text;
    }
    async updateTextContent(id, updateTextContentDto) {
        try {
            const updateData = {
                heading: updateTextContentDto.heading,
                lessonId: updateTextContentDto.lessonId,
            };
            return await this.prisma.textContent.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new Error(`Error updating textcontent with ID ${id}: ${error.message}`);
        }
    }
    async patchTextContent(id, partialUpdateDto) {
        try {
            const updateData = {
                heading: partialUpdateDto.heading,
                lessonId: partialUpdateDto.lessonId,
            };
            return await this.prisma.textContent.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new Error(`Error partially updating textcontent with ID ${id}: ${error.message}`);
        }
    }
    async delete(id) {
        const text = await this.prisma.textContent.delete({
            where: {
                id: id,
            },
        });
        return text;
    }
};
exports.TextContentService = TextContentService;
exports.TextContentService = TextContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TextContentService);
//# sourceMappingURL=textcontent.service.js.map