// src/question/question.service.spec.ts
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

describe('QuestionService', () => {
  let service: QuestionService;
  let prismaService: PrismaService;

  const mockQuestionData = {
    id: 'some-id',
    text: 'What is the capital of France?',
    answer: 'Paris',
    order: 1,
    explanation: 'The capital of France is Paris.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    question: {
      create: jest.fn().mockResolvedValue(mockQuestionData),
      delete: jest.fn().mockResolvedValue(mockQuestionData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        text: 'What is the capital of France?',
        answer: 'Paris',
        order: 1,
        quizId: ''
      };

      const result = await service.create(createQuestionDto);

      expect(prismaService.question.create).toHaveBeenCalledWith({
        data: {
          ...createQuestionDto,
          // If using options, uncomment the following line
          // Option: { create: createQuestionDto.options || [] },
        },
        include: { Option: true },
      });
      expect(result).toEqual({ Question: mockQuestionData });
    });
  });

  describe('remove', () => {
    it('should delete a question', async () => {
      const id = 'some-id';

      const result = await service.remove(id);

      expect(prismaService.question.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockQuestionData);
    });
  });
});
