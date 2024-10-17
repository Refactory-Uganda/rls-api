/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { NotFoundException } from '@nestjs/common';

describe('TopicsController', () => {
  let controller: TopicController;
  let service: TopicService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicController],
      providers: [
        {
          provide: TopicService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByCourse: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            deleteTopic: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TopicController>(TopicController);
    service = module.get<TopicService>(TopicService);
  });

  // ... (previous tests remain unchanged)

  describe('remove', () => {
    it('should remove a topic', async () => {
      const topicId = 'topic-id';
      const deletedTopic = { 
        id: topicId, 
        Title: 'Deleted Topic', 
        Description: 'This topic was deleted', 
        courseId: 'course-id',
        Course: { id: 'course-id', Title: 'Course Title' }
      };

      (service.deleteTopic as jest.Mock).mockResolvedValue(deletedTopic);

      const result = await controller.deleteTopic(topicId);

      expect(result).toEqual(deletedTopic);
      expect(service.deleteTopic).toHaveBeenCalledWith(topicId);
    });

    it('should throw NotFoundException if topic not found', async () => {
      const topicId = 'non-existent-topic-id';

      (service.deleteTopic as jest.Mock).mockRejectedValue(new NotFoundException(`Topic with ID ${topicId} not found`));

      await expect(controller.deleteTopic(topicId)).rejects.toThrow(NotFoundException);
    });
  });
});