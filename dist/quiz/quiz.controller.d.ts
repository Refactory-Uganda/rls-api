import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswerDto } from './dto/submitAnswer.dto';
import { StartQuizDto } from './dto/startquiz.dto';
import { SubmitQuizDto } from './dto/submitQuiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto): Promise<any>;
    patch(id: string, partialUpdateDto: Partial<UpdateQuizDto>): Promise<any>;
    remove(id: string): Promise<any>;
    findQuizAndQuestions(quizId: string): Promise<Quiz>;
    findAll(): Promise<any>;
    startQuiz(startQuizDto: StartQuizDto): Promise<any>;
    submitAnswer(attemptId: string, answerDto: SubmitAnswerDto): Promise<any>;
    completeQuiz(attemptId: string): Promise<any>;
    getResults(attemptId: string): Promise<{
        score: any;
        maxScore: any;
        percentage: number;
        completedAt: any;
        answers: any;
    }>;
    submitQuiz(attemptId: string, submitQuizDto: SubmitQuizDto): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
}
