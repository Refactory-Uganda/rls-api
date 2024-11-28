/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FacilitatorService } from './facilitator.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('FacilitatorService', () => {
  let service: FacilitatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacilitatorService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: {} })),
            post: jest.fn(() => of({ data: {} })),
          },
        },
      ],
    }).compile();

    service = module.get<FacilitatorService>(FacilitatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
