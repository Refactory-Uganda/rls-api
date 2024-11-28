/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';

describe('ProgramController', () => {
  let controller: ProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramController],
      providers: [
        {
          provide: ProgramService,
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

    controller = module.get<ProgramController>(ProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
