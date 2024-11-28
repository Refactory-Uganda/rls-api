/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SubHeadingController } from './subheading.controller';
import { SubHeadingService } from './subheading.service';

describe('SubHeadingController', () => {
  let controller: SubHeadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubHeadingController],
      providers: [
        {
          provide: SubHeadingService,
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

    controller = module.get<SubHeadingController>(SubHeadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
