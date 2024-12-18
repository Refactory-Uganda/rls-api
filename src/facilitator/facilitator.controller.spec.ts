/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FacilitatorController } from './facilitator.controller';
import { FacilitatorService } from './facilitator.service';

describe('FacilitatorController', () => {
  let controller: FacilitatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitatorController],
      providers: [
        {
          provide: FacilitatorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FacilitatorController>(FacilitatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
