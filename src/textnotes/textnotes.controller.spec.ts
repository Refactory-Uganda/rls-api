import { Test, TestingModule } from '@nestjs/testing';
import { TextnotesController } from './textnotes.controller';

describe('TextnotesController', () => {
  let controller: TextnotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextnotesController],
    }).compile();

    controller = module.get<TextnotesController>(TextnotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
