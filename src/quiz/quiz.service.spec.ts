// src/quiz/quiz.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

describe('QuizService', () => {
  let service: QuizService;
  let prismaService: PrismaService;

  const mockQuizData = {
    id: 'some-id',
    title: 'Sample Quiz',
    description: 'A quiz about samples',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    quiz: {
      create: jest.fn().mockResolvedValue(mockQuizData),
      delete: jest.fn().mockResolvedValue(mockQuizData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new quiz', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'Sample Quiz',
        description: 'A quiz about samples',
        lessonId: ''
      };

      const result = await service.create(createQuizDto);

      expect(prismaService.quiz.create).toHaveBeenCalledWith({
        data: {
          ...createQuizDto,
        },
        include: { questions: true },
      });
      expect(result).toEqual(mockQuizData);
    });
  });

  describe('remove', () => {
    it('should delete a quiz', async () => {
      const id = 'some-id';

      const result = await service.remove(id);

      expect(prismaService.quiz.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockQuizData);
    });
  });
});
