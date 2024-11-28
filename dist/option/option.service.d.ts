import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOptionDto: CreateOptionDto): Promise<{
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
    }>;
    patchOption(id: string, partialUpdateDto: UpdateOptionDto): Promise<{
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
    }>;
    findOptionById(optionId: string): Promise<{
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
<<<<<<< HEAD
        optionText: string;
        iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
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
<<<<<<< HEAD
        optionText: string;
        iscorrect: boolean;
=======
>>>>>>> 8c70dbe8 (fixed options)
        order: number;
        optionText: string;
        isCorrect: boolean;
        questionId: string | null;
    })[]>;
    remove(id: string): Promise<{
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
    }>;
}
