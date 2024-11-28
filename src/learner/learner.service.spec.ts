/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LearnerService } from './learner.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('LearnerService', () => {
  let service: LearnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearnerService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: {} })),
            post: jest.fn(() => of({ data: {} })),
          },
        },
      ],
    }).compile();

    service = module.get<LearnerService>(LearnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
