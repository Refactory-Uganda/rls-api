/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProgramService } from './program.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('ProgramService', () => {
  let service: ProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: {} })),
            post: jest.fn(() => of({ data: {} })),
          },
        },
      ],
    }).compile();

    service = module.get<ProgramService>(ProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
