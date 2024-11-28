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
exports.SubHeadingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubHeadingService = class SubHeadingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSubHeadingDto) {
        const { subText, textContentId } = createSubHeadingDto;
        const subHeading = await this.prisma.subHeading.create({
            data: {
                subText,
                textContentId,
            },
        });
        return subHeading;
    }
    async updateSubheading(id, updateSubheadingDto) {
        try {
            const updateData = {
                subText: updateSubheadingDto.subText,
                textContentId: updateSubheadingDto.textContentId,
            };
            return await this.prisma.subHeading.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new Error(`Error updating subheading with ID ${id}: ${error.message}`);
        }
    }
    async patchSubheading(id, partialUpdateDto) {
        try {
            const updateData = {
                subText: partialUpdateDto.subText,
                textContentId: partialUpdateDto.textContentId,
            };
            return await this.prisma.subHeading.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new Error(`Error partially updating subheading with ID ${id}: ${error.message}`);
        }
    }
    async remove(id) {
        return this.prisma.subHeading.delete({
            where: { id },
        });
    }
};
exports.SubHeadingService = SubHeadingService;
exports.SubHeadingService = SubHeadingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubHeadingService);
//# sourceMappingURL=subheading.service.js.map