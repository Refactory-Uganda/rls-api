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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuizService = class QuizService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createQuizDto) {
        return this.prisma.quiz.create({
            data: {
                title: createQuizDto.title,
                description: createQuizDto.description,
                lesson: {
                    connect: { id: createQuizDto.lessonId },
                },
            },
        });
    }
    async patchQuiz(id, partialUpdateDto) {
        try {
            const { questions, ...quizData } = partialUpdateDto;
            const updateData = {
                ...quizData,
                questions: questions
                    ? {
                        update: questions.map((question) => ({
                            where: { id: question.id },
                            data: {
                                text: question.text,
                                answer: question.answer,
                            },
                        })),
                    }
                    : undefined,
            };
            return await this.prisma.quiz.update({
                where: { id },
                data: updateData,
                include: { questions: true },
            });
        }
        catch (error) {
            throw new Error(`Error partially updating quiz with ID ${id}: ${error.message}`);
        }
    }
    async remove(id) {
        return this.prisma.quiz.delete({
            where: { id },
        });
    }
    async findQuizById(quizId) {
        return this.prisma.quiz.findUnique({
            where: {
                id: quizId,
            },
            include: {
                questions: {
                    include: {
                        option: true,
                    },
                },
            },
        });
    }
    async findQuizzes() {
        return this.prisma.quiz.findMany({
            include: {
                questions: {
                    include: {
                        option: true,
                    },
                },
            },
        });
    }
    async findByQuizId(quizId) {
        return this.prisma.quiz.findUnique({
            where: {
                id: quizId,
            },
            include: {
                questions: {
                    include: {
                        option: true,
                    },
                },
            },
        });
    }
    async startQuiz(quizId) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: { questions: true },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        const maxScore = quiz.questions.length;
        return this.prisma.quizAttempt.create({
            data: {
                quizId,
                score: 0,
                maxScore,
                status: 'IN_PROGRESS',
            },
            include: {
                quiz: {
                    include: {
                        questions: {
                            include: {
                                option: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async submitAnswer(attemptId, answerDto) {
        const attempt = await this.prisma.quizAttempt.findFirst({
            where: {
                id: attemptId,
                status: 'IN_PROGRESS',
            },
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Quiz attempt already completed');
        }
        const question = await this.prisma.question.findFirst({
            where: {
                id: answerDto.questionId,
                quiz: {
                    id: attempt.quizId,
                },
            },
            include: {
                option: true,
            },
        });
        if (!question) {
            throw new common_1.BadRequestException('Invalid question');
        }
        const selectedOption = question.option.find((s_option) => s_option.id === answerDto.optionId);
        if (!selectedOption) {
            throw new common_1.BadRequestException('Invalid option');
        }
        const userAnswer = await this.prisma.userAnswer.create({
            data: {
                quizAttemptId: attemptId,
                questionId: question.id,
                selectedOptionId: selectedOption.id,
                isCorrect: selectedOption.isCorrect,
            },
        });
        return userAnswer;
    }
    async completeQuiz(attemptId) {
        const attempt = await this.prisma.quizAttempt.findFirst({
            where: {
                id: attemptId,
                status: 'IN_PROGRESS',
            },
            include: {
                answers: true,
                quiz: {
                    include: {
                        questions: true,
                    },
                },
            },
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Quiz attempt not found');
        }
        const correctAnswers = attempt.answers.filter((answer) => answer.isCorrect).length;
        const score = (correctAnswers / attempt.quiz.questions.length) * attempt.maxScore;
        return this.prisma.quizAttempt.update({
            where: { id: attemptId },
            data: {
                score,
                status: 'COMPLETED',
                completedAt: new Date(),
            },
            include: {
                answers: {
                    include: {
                        question: true,
                        selectedOption: true,
                    },
                },
            },
        });
    }
    async getQuizResults(attemptId) {
        const attempt = await this.prisma.quizAttempt.findFirst({
            where: {
                id: attemptId,
                status: 'COMPLETED',
            },
            include: {
                quiz: {
                    include: {
                        questions: {
                            include: {
                                option: true,
                            },
                        },
                    },
                },
                answers: {
                    include: {
                        question: true,
                        selectedOption: true,
                    },
                },
            },
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Completed Quiz attempt not found');
        }
        return {
            score: attempt.score,
            maxScore: attempt.maxScore,
            percentage: (attempt.score / attempt.maxScore) * 100,
            completedAt: attempt.completedAt,
            answers: attempt.answers.map((answer) => ({
                question: answer.question.text,
                selectedAnswer: answer.selectedOption.optionText,
                isCorrect: answer.isCorrect,
                correctOption: attempt.quiz.questions
                    .find((q) => q.id === answer.questionId)
                    ?.option.find((opt) => opt.isCorrect)?.optionText,
            })),
        };
    }
    async submitQuiz(attemptId, submitQuizDto) {
        const { quizId, answers } = submitQuizDto;
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    include: {
                        option: true,
                    },
                },
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (answers.length !== quiz.questions.length) {
            throw new common_1.BadRequestException('All questions must be answered');
        }
        const userAnswerData = [];
        let score = 0;
        let maxScore = 0;
        for (const { questionId, optionId } of answers) {
            const question = quiz.questions.find((q) => q.id === questionId);
            if (!question) {
                throw new common_1.BadRequestException('Invalid questionId');
            }
            const selectedOption = question.option.find((o) => o.id === optionId);
            if (!selectedOption) {
                throw new common_1.BadRequestException('Invalid optionId');
            }
            if (selectedOption.isCorrect) {
                score += 1;
            }
            maxScore += 1;
            userAnswerData.push({
                questionId,
                quizAttemptId: submitQuizDto.attemptId,
                optionId,
                isCorrect: selectedOption.isCorrect,
            });
        }
        const quizAttempt = await this.prisma.quizAttempt.create({
            data: {
                quizId,
                answers: {
                    create: answers.map(({ questionId, optionId }) => ({
                        questionId,
                        selectedOptionId: optionId,
                        isCorrect: quiz.questions
                            .find((q) => q.id === questionId)
                            .option.find((o) => o.id === optionId).isCorrect,
                    })),
                },
                score,
                maxScore,
                status: 'COMPLETED',
            },
            include: {
                answers: {
                    include: {
                        question: {
                            include: {
                                option: true,
                            },
                        },
                        selectedOption: true,
                    },
                },
            },
        });
        return quizAttempt;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map