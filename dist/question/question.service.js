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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestionService = class QuestionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createQuestionDto) {
        const { option, ...questionData } = createQuestionDto;
        const question = await this.prisma.question.create({
            data: {
                ...questionData,
            },
            include: { option: true },
        });
        return { Question: question };
    }
    async patchQuestion(id, updateQuestionDto) {
        const { option, ...questionData } = updateQuestionDto;
        const updatedQuestion = await this.prisma.question.update({
            where: { id },
            data: {
                text: questionData.text,
                answer: questionData.answer,
                order: questionData.order,
                explanation: questionData.explanation,
                quizId: questionData.quizId,
                option: {
                    upsert: option?.map((option) => ({
                        where: { id: option.id },
                        create: {
                            optionText: option.optionText,
                            isCorrect: option.isCorrect,
                            order: option.order,
                        },
                        update: {
                            optionText: option.optionText,
                            iscorrect: option.isCorrect,
                            order: option.order,
                        },
                    })) || [],
                },
            },
            include: {
                option: true,
            },
        });
        return updatedQuestion;
    }
    async remove(id) {
        return this.prisma.question.delete({
            where: { id },
        });
    }
    async findQuestions() {
        return this.prisma.question.findMany({
            include: {
                option: true,
            },
        });
    }
    async findQuestionById(id) {
        return this.prisma.question.findUnique({
            where: {
                id: id,
            },
            include: {
                option: true,
            },
        });
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionService);
//# sourceMappingURL=question.service.js.map