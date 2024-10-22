import { Test, TestingModule } from '@nestjs/testing';
import { TextnotesService } from './textnotes.service';

describe('TextnotesService', () => {
  let service: TextnotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextnotesService],
    }).compile();

    service = module.get<TextnotesService>(TextnotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
