import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createQuestionDto: CreateQuestionDto): Promise<{
        Question: {
            option: {
                id: string;
                order: number;
                optionText: string;
                isCorrect: boolean;
                questionId: string | null;
            }[];
        } & {
            id: string;
            text: string;
            answer: string;
            order: number;
            explanation: string | null;
            quizId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    patchQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
        option: {
            id: string;
            order: number;
            optionText: string;
            isCorrect: boolean;
            questionId: string | null;
        }[];
    } & {
        id: string;
        text: string;
        answer: string;
        order: number;
        explanation: string | null;
        quizId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        text: string;
        answer: string;
        order: number;
        explanation: string | null;
        quizId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findQuestions(): Promise<({
        option: {
            id: string;
            order: number;
            optionText: string;
            isCorrect: boolean;
            questionId: string | null;
        }[];
    } & {
        id: string;
        text: string;
        answer: string;
        order: number;
        explanation: string | null;
        quizId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findQuestionById(id: string): Promise<{
        option: {
            id: string;
            order: number;
            optionText: string;
            isCorrect: boolean;
            questionId: string | null;
        }[];
    } & {
        id: string;
        text: string;
        answer: string;
        order: number;
        explanation: string | null;
        quizId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
