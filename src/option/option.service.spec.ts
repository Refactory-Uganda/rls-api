// src/option/option.service.spec.ts
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OptionService } from './option.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto } from './dto/option.dto';

describe('OptionService', () => {
  let service: OptionService;
  let prismaService: PrismaService;

  const mockOptionData = {
    id: 'some-id',
    optionText: 'Paris',
    iscorrect: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    option: {
      create: jest.fn().mockResolvedValue(mockOptionData),
      delete: jest.fn().mockResolvedValue(mockOptionData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OptionService>(OptionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new option', async () => {
      const createOptionDto: CreateOptionDto = {
        optionText: 'Paris',
        iscorrect: true,
        order: 1,
        questionId: ''
      };

      const result = await service.create(createOptionDto);

      expect(prismaService.option.create).toHaveBeenCalledWith({
        data: createOptionDto,
      });
      expect(result).toEqual(mockOptionData);
    });
  });

  describe('remove', () => {
    it('should delete an option', async () => {
      const id = 'some-id';

      const result = await service.remove(id);

      expect(prismaService.option.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockOptionData);
    });
  });
});
