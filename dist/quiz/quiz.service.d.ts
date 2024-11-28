import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from '@prisma/client';
import { SubmitAnswerDto } from './dto/submitAnswer.dto';
import { SubmitQuizDto } from './dto/submitQuiz.dto';
export declare class QuizService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createQuizDto: CreateQuizDto): Promise<any>;
    patchQuiz(id: string, partialUpdateDto: UpdateQuizDto): Promise<any>;
    remove(id: string): Promise<any>;
    findQuizById(quizId: string): Promise<any>;
    findQuizzes(): Promise<any>;
    findByQuizId(quizId: string): Promise<Quiz>;
    startQuiz(quizId: string): Promise<any>;
    submitAnswer(attemptId: string, answerDto: SubmitAnswerDto): Promise<any>;
    completeQuiz(attemptId: string): Promise<any>;
    getQuizResults(attemptId: string): Promise<{
        score: any;
        maxScore: any;
        percentage: number;
        completedAt: any;
        answers: any;
    }>;
    submitQuiz(attemptId: string, submitQuizDto: SubmitQuizDto): Promise<any>;
}
