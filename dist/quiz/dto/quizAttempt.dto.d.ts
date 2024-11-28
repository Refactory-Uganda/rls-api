import { AttemptStatus } from "@prisma/client";
import { SubmitAnswerDto } from "./submitAnswer.dto";
export declare class QuizAttemptDto {
    id: string;
    quizId: string;
    userId: string;
    score: number;
    maxScore: number;
    status: AttemptStatus;
    answers: SubmitAnswerDto[];
}
