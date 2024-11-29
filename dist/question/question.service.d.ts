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
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            answer: string;
            order: number;
            explanation: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        answer: string;
        order: number;
        explanation: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        answer: string;
        order: number;
        explanation: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        answer: string;
        order: number;
        explanation: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        answer: string;
        order: number;
        explanation: string | null;
    }>;
}
