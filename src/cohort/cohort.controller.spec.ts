/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CohortController } from './cohort.controller';
import { CohortService } from './cohort.service';

describe('CohortController', () => {
  let controller: CohortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohortController],
      providers: [
        {
          provide: CohortService,
          useValue: {}, // You can provide a mock implementation here if needed
        },
      ],
    }).compile();

    controller = module.get<CohortController>(CohortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
