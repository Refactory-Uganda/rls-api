/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

const mockPrismaService = {
  lesson: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('LessonService', () => {
  let service: LessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LessonService>(LessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNew', () => {
    it('should create a new lesson', async () => {
      const createLessonDto: CreateLessonDto = { title: 'New Lesson', text: 'Lesson content', topicId: 'topicId' };
      mockPrismaService.lesson.create.mockResolvedValue(createLessonDto);

      const result = await service.createNew(createLessonDto);
      expect(result).toEqual(createLessonDto);
      expect(mockPrismaService.lesson.create).toHaveBeenCalledWith({
        data: createLessonDto,
        include: { topic: true },
      });
    });
  });

  describe('updateLesson', () => {
    it('should update a lesson', async () => {
      const id = '1';
      const updateLessonDto: UpdateLessonDto = { title: 'Updated Title', topicId: 'topicId' };
      mockPrismaService.lesson.update.mockResolvedValue({ ...updateLessonDto, id });

      const result = await service.updateLesson(id, updateLessonDto);
      expect(result).toEqual({ ...updateLessonDto, id });
      expect(mockPrismaService.lesson.update).toHaveBeenCalledWith({
        where: { id },
        data: updateLessonDto,
      });
    });
  });

  describe('patchLesson', () => {
    it('should partially update a lesson', async () => {
      const id = '1';
      const partialUpdateDto: Partial<UpdateLessonDto> = { title: 'Partially Updated Title' };
      mockPrismaService.lesson.update.mockResolvedValue({ ...partialUpdateDto, id });

      const result = await service.patchLesson(id, partialUpdateDto);
      expect(result).toEqual({ ...partialUpdateDto, id });
      expect(mockPrismaService.lesson.update).toHaveBeenCalledWith({
        where: { id },
        data: partialUpdateDto,
      });
    });
  });

  describe('deleteLesson', () => {
    it('should delete a lesson', async () => {
      const id = '1';
      mockPrismaService.lesson.delete.mockResolvedValue(undefined);

      const result = await service.deleteLesson(id);
      expect(result).toBeUndefined();
      expect(mockPrismaService.lesson.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('findAllLessons', () => {
    it('should return all lessons', async () => {
      const lessons = [{ title: 'Lesson 1' }, { title: 'Lesson 2' }];
      mockPrismaService.lesson.findMany.mockResolvedValue(lessons);

      const result = await service.findAllLessons();
      expect(result).toEqual(lessons);
      expect(mockPrismaService.lesson.findMany).toHaveBeenCalled();
    });
  });

  describe('findLessonById', () => {
    it('should find a lesson by id', async () => {
      const lessonId = '1';
      const lesson = { title: 'Test Lesson', id: lessonId };
      mockPrismaService.lesson.findUnique.mockResolvedValue(lesson);

      const result = await service.findLessonById(lessonId);
      expect(result).toEqual(lesson);
      expect(mockPrismaService.lesson.findUnique).toHaveBeenCalledWith({
        where: { id: lessonId },
      });
    });
  });
});
