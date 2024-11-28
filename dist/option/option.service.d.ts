import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOptionDto: CreateOptionDto): Promise<{
        id: string;
        optionText: string;
        isCorrect: boolean | null;
        order: number;
        questionId: string | null;
    }>;
    patchOption(id: string, partialUpdateDto: UpdateOptionDto): Promise<{
        id: string;
        optionText: string;
        isCorrect: boolean | null;
        order: number;
        questionId: string | null;
    }>;
    findOptionById(optionId: string): Promise<{
        question: {
            id: string;
            text: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            order: number;
            answer: string;
            explanation: string | null;
        };
    } & {
        id: string;
        optionText: string;
        isCorrect: boolean | null;
        order: number;
        questionId: string | null;
    }>;
    findAll(): Promise<({
        question: {
            id: string;
            text: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            order: number;
            answer: string;
            explanation: string | null;
        };
    } & {
        id: string;
        optionText: string;
        isCorrect: boolean | null;
        order: number;
        questionId: string | null;
    })[]>;
    remove(id: string): Promise<{
        id: string;
        optionText: string;
        isCorrect: boolean | null;
        order: number;
        questionId: string | null;
    }>;
}
