/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SubHeadingService } from './subheading.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SubHeadingService', () => {
  let service: SubHeadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubHeadingService,
        {
          provide: PrismaService,
          useValue: {
            subHeading: {
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

    service = module.get<SubHeadingService>(SubHeadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
