/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { PrismaService } from '../prisma/prisma.service';

describe('LessonService', () => {
  let service: LessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        {
          provide: PrismaService,
          useValue: {
            lesson: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<LessonService>(LessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
