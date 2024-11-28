/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OptionService } from './option.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OptionService', () => {
  let service: OptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptionService,
        {
          provide: PrismaService,
          useValue: {
            option: {
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

    service = module.get<OptionService>(OptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
