import { CreateOptionDto } from "src/option/dto/option.dto";
export declare class CreateQuestionDto {
    text: string;
    answer: string;
    order: number;
    explanation?: string;
    quizId: string;
    id: string;
    option?: CreateOptionDto[];
}
