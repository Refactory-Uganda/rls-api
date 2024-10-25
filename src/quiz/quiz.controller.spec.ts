// src/quiz/quiz.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

describe('QuizController', () => {
  let controller: QuizController;
  let quizService: QuizService;

  const mockQuizData = {
    id: 'some-id',
    title: 'Sample Quiz',
    description: 'A quiz about samples',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockQuizService = {
    create: jest.fn().mockResolvedValue(mockQuizData),
    remove: jest.fn().mockResolvedValue(mockQuizData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [{ provide: QuizService, useValue: mockQuizService }],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    quizService = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new quiz', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        description: 'A quiz about samples',
        lessonId: ''
      };

      const result = await controller.create(createQuizDto);

      expect(quizService.create).toHaveBeenCalledWith(createQuizDto);
      expect(result).toEqual(mockQuizData);
    });
  });

  describe('remove', () => {
    it('should delete a quiz', async () => {
      const id = 'some-id';

      const result = await controller.remove(id);

      expect(quizService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockQuizData);
    });
  });
});
