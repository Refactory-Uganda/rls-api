import { Test, TestingModule } from '@nestjs/testing';
import { SlideService } from './slide.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SlideService', () => {
  let service: SlideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlideService,
        {
          provide: PrismaService,
          useValue: {
            slide: {
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

    service = module.get<SlideService>(SlideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
