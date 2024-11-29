import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
export declare class CreateQuizDto {
    title: string;
    description: string;
    lessonId: string;
    questions?: CreateQuestionDto[];
}
