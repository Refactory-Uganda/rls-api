import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(createOptionDto: CreateOptionDto): Promise<{
        id: string;
        order: number;
        optionText: string;
        isCorrect: boolean;
        questionId: string | null;
    }>;
    findAll(): Promise<({
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
    } & {
        id: string;
        order: number;
        optionText: string;
        isCorrect: boolean;
        questionId: string | null;
    })[]>;
    findOne(optionId: string): Promise<{
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
    } & {
        id: string;
        order: number;
        optionText: string;
        isCorrect: boolean;
        questionId: string | null;
    }>;
    patchOption(id: string, partialUpdateDto: Partial<UpdateOptionDto>): Promise<{
        id: string;
        order: number;
        optionText: string;
        isCorrect: boolean;
        questionId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        optionText: string;
        isCorrect: boolean;
        questionId: string | null;
    }>;
}
