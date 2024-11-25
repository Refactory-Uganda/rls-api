/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SubHeadingController } from './subheading.controller';

describe('SubHeadingController', () => {
  let controller: SubHeadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubHeadingController],
    }).compile();

    controller = module.get<SubHeadingController>(SubHeadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
