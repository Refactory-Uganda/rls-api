/* eslint-disable prettier/prettier */
// course.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from 'src/prisma/prisma.service';

const mockCourses = [
  { id: 1, name: 'Course 1' },
  { id: 2, name: 'Course 2' },
];

describe('CourseService', () => {
  let courseService: CourseService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    course: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    courseService = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all courses successfully', async () => {
    prismaService.course.findMany.mockResolvedValue(mockCourses);
    
    const result = await courseService.findAll();
    
    expect(result).toEqual(mockCourses);
    expect(prismaService.course.findMany).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if fetching courses fails', async () => {
    const errorMessage = 'Database error';
    prismaService.course.findMany.mockRejectedValue(new Error(errorMessage));
    
    await expect(courseService.findAll()).rejects.toThrowError(`Error fetching courses: ${errorMessage}`);
  });
});
