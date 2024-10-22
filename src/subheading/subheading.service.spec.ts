import { Test, TestingModule } from '@nestjs/testing';
import { SubheadingService } from './subheading.service';

describe('SubheadingService', () => {
  let service: SubheadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubheadingService],
    }).compile();

    service = module.get<SubheadingService>(SubheadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
