/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

describe('OptionController', () => {
  let controller: OptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionController],
      providers: [
        {
          provide: OptionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OptionController>(OptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
