import { SubmitAnswerDto } from "./submitAnswer.dto";
export declare class SubmitQuizDto {
    quizId: string;
    attemptId: string;
    answers: SubmitAnswerDto[];
}
