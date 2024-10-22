import { Test, TestingModule } from '@nestjs/testing';
import { TextcontentService } from './textcontent.service';

describe('TextcontentService', () => {
  let service: TextcontentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextcontentService],
    }).compile();

    service = module.get<TextcontentService>(TextcontentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
