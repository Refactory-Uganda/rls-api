import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto): Promise<{
        Question: any;
    }>;
    patch(id: string, partialUpdateDto: Partial<UpdateQuestionDto>): Promise<any>;
    remove(id: string): Promise<any>;
    findAll(): Promise<any>;
    findOne(question_id: string): Promise<any>;
}
