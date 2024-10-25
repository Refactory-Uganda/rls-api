// src/option/option.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/option.dto';

describe('OptionController', () => {
  let controller: OptionController;
  let optionService: OptionService;

  const mockOptionData = {
    id: 'some-id',
    optionText: 'Paris',
    iscorrect: true,
    order: 1,
  };

  const mockOptionService = {
    create: jest.fn().mockResolvedValue(mockOptionData),
    remove: jest.fn().mockResolvedValue(mockOptionData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionController],
      providers: [{ provide: OptionService, useValue: mockOptionService }],
    }).compile();

    controller = module.get<OptionController>(OptionController);
    optionService = module.get<OptionService>(OptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new option', async () => {
      const createOptionDto: CreateOptionDto = {
        optionText: 'Paris',
        iscorrect: true,
        order: 1,
        questionId: ''
      };

      const result = await controller.create(createOptionDto);

      expect(optionService.create).toHaveBeenCalledWith(createOptionDto);
      expect(result).toEqual(mockOptionData);
    });
  });

  describe('remove', () => {
    it('should delete an option', async () => {
      const id = 'some-id';

      const result = await controller.remove(id);

      expect(optionService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockOptionData);
    });
  });
});
