/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TextContentService } from './textcontent.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TextContentService', () => {
  let service: TextContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextContentService,
        {
          provide: PrismaService,
          useValue: {
            textContent: {
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

    service = module.get<TextContentService>(TextContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
