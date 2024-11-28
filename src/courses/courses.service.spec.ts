/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './courses.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from './images.service';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CourseService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              findUnique: jest.fn().mockResolvedValue({
                id: '671a5e6efd0249d6ee204579',
                Title: 'Test Course',
              }),
              update: jest.fn().mockResolvedValue({
                id: '671a5e6efd0249d6ee204579',
                Title: 'Updated Course Title',
              }),
            },
            topic: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: ImageService,
          useValue: {
            uploadImage: jest.fn(),
            deleteImage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  it('should update course and lessons correctly', async () => {
    const updateDto: UpdateCourseDto = {
      Title: 'Updated Course Title',
      Description: 'Updated Description',
      Duration: '30',
      status: 'PUBLISHED',
      topics: [
        {
          Title: 'Updated Topic',
          Description: 'Updated Description',
          s: 'test',
          lessons: [
            {
              title: 'Updated Lesson',
              text: 'Updated Lesson Text',
            },
          ],
        },
      ],
    };

    const result = await service.patchCourse(
      '671a5e6efd0249d6ee204579',
      updateDto,
    );
    expect(result).toBeDefined();
    expect(result.Title).toEqual('Updated Course Title');
  });
});
