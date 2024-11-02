/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Topic } from '@prisma/client';

describe('TopicsService', () => {
  let service: TopicService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicService,
        {
          provide: PrismaService,
          useValue: {
            topic: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            course: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TopicService>(TopicService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  // ... (previous tests remain unchanged)

  describe('deleteTopic', () => {
    it('should delete a topic', async () => {
      const topicId = 'topic-id';
      const deletedTopic = {  
        id: topicId, 
        Title: 'Deleted Topic', 
        Description: 'This topic was deleted', 
        courseId: 'course-id',
        Course: { id: 'course-id', Title: 'Course Title' }
      };

      (prismaService.topic.delete as jest.Mock).mockResolvedValue(deletedTopic);

      const result = await service.deleteTopic(topicId);

      expect(result).toEqual(deletedTopic);
      expect(prismaService.topic.delete).toHaveBeenCalledWith({
        where: { id: topicId },
        include: { Course: true },
      });
    });

    // it('should throw NotFoundException if topic not found', async () => {
    //   const topicId = 'non-existent-topic-id';

    //   (prismaService.topic.delete as jest.Mock).mockRejectedValue(new Error('Record to delete does not exist.'));

    //   await expect(service.deleteTopic(topicId)).rejects.toThrow(NotFoundException);
    // });
  });
});



//new
const mockTopicData: Topic = {
  id: '1',
  Title: 'Test Topic',
  Description: 'This is a test topic.',
  createdAt: new Date(),
  courseId: 'courseId',
};

const mockPrismaService = {
  topic: {
    create: jest.fn().mockResolvedValue(mockTopicData),
    update: jest.fn().mockResolvedValue(mockTopicData),
    delete: jest.fn().mockResolvedValue(mockTopicData),
    findMany: jest.fn().mockResolvedValue([mockTopicData]),
    findUnique: jest.fn().mockResolvedValue(mockTopicData),
  },
};

describe('TopicService', () => {
  let service: TopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a topic', async () => {
    const result = await service.create({ Title: 'New Topic', courseId: 'courseId' });
    expect(result).toEqual(mockTopicData);
    expect(mockPrismaService.topic.create).toHaveBeenCalledWith({
      data: { Title: 'New Topic', courseId: 'courseId' },
      include: { Course: true },
    });
  });

  it('should update a topic', async () => {
    const result = await service.updateTopic('1', { Title: 'Updated Topic' });
    expect(result).toEqual(mockTopicData);
    expect(mockPrismaService.topic.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { Title: 'Updated Topic' },
    });
  });

  it('should delete a topic', async () => {
    const result = await service.deleteTopic('1');
    expect(result).toEqual(mockTopicData);
    expect(mockPrismaService.topic.delete).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { Course: true },
    });
  });

  it('should find all topics by courseId', async () => {
    const result = await service.findAllTopicsByCourse('courseId');
    expect(result).toEqual([mockTopicData]);
    expect(mockPrismaService.topic.findMany).toHaveBeenCalledWith({
      where: { courseId: 'courseId' },
    });
  });

  it('should find a topic by id', async () => {
    const result = await service.findOneTopic('1');
    expect(result).toEqual(mockTopicData);
    expect(mockPrismaService.topic.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { Course: true },
    });
  });
});
