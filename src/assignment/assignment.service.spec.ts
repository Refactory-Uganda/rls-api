import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/textnotes/textnotes.service.spec.ts
import { NoteService } from './textnotes.service';
import { PrismaService } from '../prisma/prisma.service';
=======
import { AssignmentService } from './assignment.service';
>>>>>>> feature-Two:src/assignment/assignment.service.spec.ts

describe('AssignmentService', () => {
  let service: AssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<< HEAD:src/textnotes/textnotes.service.spec.ts
      providers: [
        NoteService,
        {
          provide: PrismaService,
          useValue: {
            note: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
=======
      providers: [AssignmentService],
>>>>>>> feature-Two:src/assignment/assignment.service.spec.ts
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
