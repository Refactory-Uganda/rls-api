import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(createOptionDto: CreateOptionDto): Promise<{
        id: string;
        optionText: string;
        isCorrect: boolean;
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
        isCorrect: boolean;
        order: number;
        questionId: string | null;
    })[]>;
    findOne(optionId: string): Promise<{
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
        isCorrect: boolean;
        order: number;
        questionId: string | null;
    }>;
    patchOption(id: string, partialUpdateDto: Partial<UpdateOptionDto>): Promise<{
        id: string;
        optionText: string;
        isCorrect: boolean;
        order: number;
        questionId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        optionText: string;
        isCorrect: boolean;
        order: number;
        questionId: string | null;
    }>;
}
