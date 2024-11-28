/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TextContentController } from './textcontent.controller';
import { TextContentService } from './textcontent.service';

describe('TextContentController', () => {
  let controller: TextContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextContentController],
      providers: [
        {
          provide: TextContentService,
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

    controller = module.get<TextContentController>(TextContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
