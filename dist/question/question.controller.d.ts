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
                optionText: string;
                iscorrect: boolean;
                order: number;
                questionId: string | null;
            }[];
        } & {
            id: string;
            text: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
            order: number;
            answer: string;
            explanation: string | null;
        };
    }>;
    patch(id: string, partialUpdateDto: Partial<UpdateQuestionDto>): Promise<{
        option: {
            id: string;
            optionText: string;
            iscorrect: boolean;
            order: number;
            questionId: string | null;
        }[];
    } & {
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        order: number;
        answer: string;
        explanation: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        order: number;
        answer: string;
        explanation: string | null;
    }>;
    findAll(): Promise<({
        option: {
            id: string;
            optionText: string;
            iscorrect: boolean;
            order: number;
            questionId: string | null;
        }[];
    } & {
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        order: number;
        answer: string;
        explanation: string | null;
    })[]>;
    findOne(question_id: string): Promise<{
        option: {
            id: string;
            optionText: string;
            iscorrect: boolean;
            order: number;
            questionId: string | null;
        }[];
    } & {
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        quizId: string;
        order: number;
        answer: string;
        explanation: string | null;
    }>;
}
