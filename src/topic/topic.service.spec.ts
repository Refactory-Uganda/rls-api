/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

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
        Course: { id: 'course-id', Title: 'Course Title' },
      };

      (prismaService.topic.delete as jest.Mock).mockResolvedValue(deletedTopic);

      const result = await service.deleteTopic(topicId);

      expect(result).toEqual(deletedTopic);
      expect(prismaService.topic.delete).toHaveBeenCalledWith({
        where: { id: topicId },
        include: { Course: true },
      });
    });

    it('should throw NotFoundException if topic not found', async () => {
      const topicId = 'non-existent-topic-id';

      (prismaService.topic.delete as jest.Mock).mockRejectedValue(
        new NotFoundException(`Topic with ID ${topicId} not found`),
      );

      await expect(service.deleteTopic(topicId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
