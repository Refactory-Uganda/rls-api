// src/question/question.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

describe('QuestionController', () => {
  let controller: QuestionController;
  let questionService: QuestionService;

  const mockQuestionData = {
    id: 'some-id',
    text: 'What is the capital of France?',
    answer: 'Paris',
    order: 1,
    explanation: 'The capital of France is Paris.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockQuestionService = {
    create: jest.fn().mockResolvedValue({ Question: mockQuestionData }),
    remove: jest.fn().mockResolvedValue(mockQuestionData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [{ provide: QuestionService, useValue: mockQuestionService }],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        text: 'What is the capital of France?',
        answer: 'Paris',
        order: 1,
        quizId: ''
      };

      const result = await controller.create(createQuestionDto);

      expect(questionService.create).toHaveBeenCalledWith(createQuestionDto);
      expect(result).toEqual({ Question: mockQuestionData });
    });
  });

  describe('remove', () => {
    it('should delete a question', async () => {
      const id = 'some-id';

      const result = await controller.remove(id);

      expect(questionService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockQuestionData);
    });
  });
});
