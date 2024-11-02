import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from '@prisma/client';
import { mockCourseResponse, mockCreateCourseDto, mockUpdateCourseDto } from './mock-data';

describe('CoursesController', () => {
  let courseController: CourseController;
  let courseService: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    courseController = module.get<CourseController>(CourseController);
    courseService = module.get<CourseService>(CourseService);
  });

  describe('createCourseDraft', () => {
    it('should create a course draft successfully', async () => {
      const createCourseDto: CreateCourseDto = {
        ...mockCreateCourseDto,
        topics: [], 
      };

      // Mock the service method
      jest.spyOn(courseService, 'createCourseDraft').mockResolvedValue(mockCourseResponse as Course);

      const result = await courseController.createCourseDraft(createCourseDto);

      expect(result).toEqual(mockCourseResponse);
      expect(courseService.createCourseDraft).toHaveBeenCalledWith(createCourseDto);
      expect(courseService.createCourseDraft).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      jest.spyOn(courseService, 'findAll').mockResolvedValue([{ 
        ...mockCourseResponse, 
        topics: [] // Add the topics property here
      }]);

      const result = await courseController.findAll();

      expect(result).toEqual([mockCourseResponse]);
      expect(courseService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      const courseId = '60c72b2f9b1d4e3a4c8b4567';

      jest.spyOn(courseService, 'findOne').mockResolvedValue({
        ...mockCourseResponse,
        topics: [] // Add the topics property here
      });

      const result = await courseController.findOne(courseId);

      expect(result).toEqual(mockCourseResponse);
      expect(courseService.findOne).toHaveBeenCalledWith(courseId);
      expect(courseService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a course successfully', async () => {
      const courseId = '60c72b2f9b1d4e3a4c8b4567';
      const updateCourseDto: UpdateCourseDto = mockUpdateCourseDto;

      jest.spyOn(courseService, 'updateCourse').mockResolvedValue(mockCourseResponse);

      const result = await courseController.update(courseId, updateCourseDto);

      expect(result).toEqual(mockCourseResponse);
      expect(courseService.updateCourse).toHaveBeenCalledWith(courseId, updateCourseDto);
      expect(courseService.updateCourse).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course by id', async () => {
      const courseId = '60c72b2f9b1d4e3a4c8b4567';

      jest.spyOn(courseService, 'deleteCourse').mockResolvedValue(mockCourseResponse);

      const result = await courseController.deleteCourse(courseId);

      expect(result).toEqual(mockCourseResponse);
      expect(courseService.deleteCourse).toHaveBeenCalledWith(courseId);
      expect(courseService.deleteCourse).toHaveBeenCalledTimes(1);
    });
  });
});
