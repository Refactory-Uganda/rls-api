import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createQuestionDto: CreateQuestionDto): Promise<{
        Question: any;
    }>;
    patchQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<any>;
    remove(id: string): Promise<any>;
    findQuestions(): Promise<any>;
    findQuestionById(id: string): Promise<any>;
}
