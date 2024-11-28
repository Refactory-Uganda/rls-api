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
    }>;
    patch(id: string, partialUpdateDto: Partial<UpdateQuestionDto>): Promise<{
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
    findAll(): Promise<({
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
    })[]>;
    findOne(question_id: string): Promise<{
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
    }>;
}
