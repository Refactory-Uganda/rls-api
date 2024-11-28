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
exports.OptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OptionService = class OptionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOptionDto) {
        return this.prisma.option.create({
            data: createOptionDto,
        });
    }
    async patchOption(id, partialUpdateDto) {
        try {
            const updateData = {
                ...partialUpdateDto,
            };
            Object.keys(updateData).forEach((key) => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });
            return await this.prisma.option.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new Error(`Error partially updating option with ID ${id}: ${error.message}`);
        }
    }
    async findOptionById(optionId) {
        return this.prisma.option.findUnique({
            where: {
                id: optionId,
            },
            include: {
                question: true,
            },
        });
    }
    async findAll() {
        return this.prisma.option.findMany({
            include: {
                question: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.option.delete({
            where: { id },
        });
    }
};
exports.OptionService = OptionService;
exports.OptionService = OptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OptionService);
//# sourceMappingURL=option.service.js.map