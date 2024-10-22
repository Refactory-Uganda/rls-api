import { Test, TestingModule } from '@nestjs/testing';
import { SubheadingController } from './subheading.controller';

describe('SubheadingController', () => {
  let controller: SubheadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubheadingController],
    }).compile();

    controller = module.get<SubheadingController>(SubheadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
