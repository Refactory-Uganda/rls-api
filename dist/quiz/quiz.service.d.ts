import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from '@prisma/client';
import { SubmitAnswerDto } from './dto/submitAnswer.dto';
import { SubmitQuizDto } from './dto/submitQuiz.dto';
export declare class QuizService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createQuizDto: CreateQuizDto): Promise<{
        description: string | null;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        courseId: string | null;
    }>;
    patchQuiz(id: string, partialUpdateDto: UpdateQuizDto): Promise<{
        questions: {
            id: string;
            text: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            answer: string;
            order: number;
            explanation: string | null;
        }[];
    } & {
        description: string | null;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        courseId: string | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        courseId: string | null;
    }>;
    findQuizById(quizId: string): Promise<{
        questions: ({
            option: {
                id: string;
<<<<<<< HEAD
                optionText: string;
                iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
                order: number;
                optionText: string;
                isCorrect: boolean;
                questionId: string | null;
            }[];
        } & {
            id: string;
            text: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            answer: string;
            order: number;
            explanation: string | null;
        })[];
    } & {
        description: string | null;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        courseId: string | null;
    }>;
    findQuizzes(): Promise<({
        questions: ({
            option: {
                id: string;
<<<<<<< HEAD
                optionText: string;
                iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
                order: number;
                optionText: string;
                isCorrect: boolean;
                questionId: string | null;
            }[];
        } & {
            id: string;
            text: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            answer: string;
            order: number;
            explanation: string | null;
        })[];
    } & {
        description: string | null;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
        courseId: string | null;
    })[]>;
    findByQuizId(quizId: string): Promise<Quiz>;
    startQuiz(quizId: string): Promise<{
        quiz: {
            questions: ({
                option: {
                    id: string;
<<<<<<< HEAD
                    optionText: string;
                    iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
                    order: number;
                    optionText: string;
                    isCorrect: boolean;
                    questionId: string | null;
                }[];
            } & {
                id: string;
                text: string;
                createdAt: Date;
                updatedAt: Date;
                quizId: string;
                answer: string;
                order: number;
                explanation: string | null;
            })[];
        } & {
            description: string | null;
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string | null;
            courseId: string | null;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.AttemptStatus;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        score: number;
        maxScore: number;
        startedAt: Date;
        completedAt: Date | null;
    }>;
    submitAnswer(attemptId: string, answerDto: SubmitAnswerDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionId: string;
        isCorrect: boolean;
        quizAttemptId: string;
        selectedOptionId: string;
    }>;
    completeQuiz(attemptId: string): Promise<{
        answers: ({
            question: {
                id: string;
                text: string;
                createdAt: Date;
                updatedAt: Date;
                quizId: string;
                answer: string;
                order: number;
                explanation: string | null;
            };
            selectedOption: {
                id: string;
<<<<<<< HEAD
                optionText: string;
                iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
                order: number;
                optionText: string;
                isCorrect: boolean;
                questionId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            questionId: string;
            isCorrect: boolean;
            quizAttemptId: string;
            selectedOptionId: string;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.AttemptStatus;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        score: number;
        maxScore: number;
        startedAt: Date;
        completedAt: Date | null;
    }>;
    getQuizResults(attemptId: string): Promise<{
        score: number;
        maxScore: number;
        percentage: number;
        completedAt: Date;
        answers: {
            question: string;
            selectedAnswer: string;
            isCorrect: boolean;
            correctOption: string;
        }[];
    }>;
    submitQuiz(attemptId: string, submitQuizDto: SubmitQuizDto): Promise<{
        answers: ({
            question: {
                option: {
                    id: string;
<<<<<<< HEAD
                    optionText: string;
                    iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
                    order: number;
                    optionText: string;
                    isCorrect: boolean;
                    questionId: string | null;
                }[];
            } & {
                id: string;
                text: string;
                createdAt: Date;
                updatedAt: Date;
                quizId: string;
                answer: string;
                order: number;
                explanation: string | null;
            };
            selectedOption: {
                id: string;
<<<<<<< HEAD
                optionText: string;
                iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
                order: number;
                optionText: string;
                isCorrect: boolean;
                questionId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            questionId: string;
            isCorrect: boolean;
            quizAttemptId: string;
            selectedOptionId: string;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.AttemptStatus;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        score: number;
        maxScore: number;
        startedAt: Date;
        completedAt: Date | null;
    }>;
}
