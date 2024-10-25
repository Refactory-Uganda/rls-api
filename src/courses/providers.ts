import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
// import { Course } from '@prisma/client';

export const createTestModule = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    controllers: [CourseController],
    providers: [
      {
        provide: CourseService,
        useValue: {
          createCourseDraft: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          updateCourse: jest.fn(),
          deleteCourse: jest.fn(),
        },
      },
    ],
  }).compile();
};
