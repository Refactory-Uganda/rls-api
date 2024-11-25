/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SubHeadingService } from './subheading.service';

describe('SubHeadingService', () => {
  let service: SubHeadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubHeadingService],
    }).compile();

    service = module.get<SubHeadingService>(SubHeadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
