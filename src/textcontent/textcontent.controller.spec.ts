import { Test, TestingModule } from '@nestjs/testing';
import { TextcontentController } from './textcontent.controller';

describe('TextcontentController', () => {
  let controller: TextcontentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextcontentController],
    }).compile();

    controller = module.get<TextcontentController>(TextcontentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
