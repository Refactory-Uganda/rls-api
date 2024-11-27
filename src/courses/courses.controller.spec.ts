import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { ImageService } from './images.service';

describe('CourseController', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            createCourseDraft: jest.fn(),
            patchCourse: jest.fn(),
            remove: jest.fn(),
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

    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
