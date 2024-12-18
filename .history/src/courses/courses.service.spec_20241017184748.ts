import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service.ts';
import { PrismaService } from '../prisma/prisma.service';

describe('CourseService', () => {
  let courseService: CourseService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    courseService = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(courseService).toBeDefined();
  });
});
