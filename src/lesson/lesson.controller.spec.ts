import { Test, TestingModule } from '@nestjs/testing';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

const mockLessonService = {
  createNew: jest.fn(),
  updateLesson: jest.fn(),
  patchLesson: jest.fn(),
  deleteLesson: jest.fn(),
  findAllLessons: jest.fn(),
  findLessonById: jest.fn(),
};

describe('LessonController', () => {
  let controller: LessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [{ provide: LessonService, useValue: mockLessonService }],
    }).compile();

    controller = module.get<LessonController>(LessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLesson', () => {
    it('should create a lesson', async () => {
      const createLessonDto: CreateLessonDto = { title: 'New Lesson', text: 'Lesson content', topicId: 'topicId' };
      const topic_id = 'topicId';
      mockLessonService.createNew.mockResolvedValue({ ...createLessonDto });
      
      const result = await controller.createLesson(topic_id, createLessonDto);
      expect(result).toEqual(createLessonDto);
      expect(mockLessonService.createNew).toHaveBeenCalledWith(createLessonDto);
    });
  });

  describe('update', () => {
    it('should update a lesson', async () => {
      const updateLessonDto: UpdateLessonDto = { title: 'Updated Lesson', topicId: 'topicId' };
      const id = '1';
      mockLessonService.updateLesson.mockResolvedValue({ ...updateLessonDto, id });
      
      const result = await controller.update(id, updateLessonDto);
      expect(result).toEqual({ ...updateLessonDto, id });
      expect(mockLessonService.updateLesson).toHaveBeenCalledWith(id, updateLessonDto);
    });
  });

  describe('patch', () => {
    it('should partially update a lesson', async () => {
      const id = '1';
      const partialUpdateDto: Partial<UpdateLessonDto> = { title: 'Partially Updated Title' };
      mockLessonService.patchLesson.mockResolvedValue({ ...partialUpdateDto, id });
      
      const result = await controller.patch(id, partialUpdateDto);
      expect(result).toEqual({ ...partialUpdateDto, id });
      expect(mockLessonService.patchLesson).toHaveBeenCalledWith(id, partialUpdateDto);
    });
  });

  describe('deleteLesson', () => {
    it('should delete a lesson', async () => {
      const lesson_id = '1';
      mockLessonService.deleteLesson.mockResolvedValue(undefined);
      
      const result = await controller.deleteLesson(lesson_id);
      expect(result).toBeUndefined();
      expect(mockLessonService.deleteLesson).toHaveBeenCalledWith(lesson_id);
    });
  });

  describe('findAllLessons', () => {
    it('should return all lessons', async () => {
      const lessons = [{ title: 'Lesson 1' }, { title: 'Lesson 2' }];
      mockLessonService.findAllLessons.mockResolvedValue(lessons);
      
      const result = await controller.findAllLessons();
      expect(result).toEqual(lessons);
      expect(mockLessonService.findAllLessons).toHaveBeenCalled();
    });
  });

  describe('findLessonById', () => {
    it('should find a lesson by id', async () => {
      const lessonId = '1';
      const lesson = { title: 'Test Lesson', id: lessonId };
      mockLessonService.findLessonById.mockResolvedValue(lesson);
      
      const result = await controller.findLessonById(lessonId);
      expect(result).toEqual(lesson);
      expect(mockLessonService.findLessonById).toHaveBeenCalledWith(lessonId);
    });
  });
});
