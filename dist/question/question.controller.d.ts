import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
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
    patch(id: string, partialUpdateDto: Partial<UpdateQuestionDto>): Promise<{
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
    findAll(): Promise<({
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
    findOne(question_id: string): Promise<{
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
