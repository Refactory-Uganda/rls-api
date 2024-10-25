/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

describe('accessing topic controller', () => {
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

  describe('as an admin,I want to remove a topic', () => {
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

//new
const mockTopicService = {
  create: jest.fn(),
  updateTopic: jest.fn(),
  patchTopic: jest.fn(),
  deleteTopic: jest.fn(),
  findAllTopicsByCourse: jest.fn(),
  findOneTopic: jest.fn(),
};

describe('accessing topic controller', () => {
  let controller: TopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicController],
      providers: [{ provide: TopicService, useValue: mockTopicService }],
    }).compile();

    controller = module.get<TopicController>(TopicController);
  });

  describe('as an admin,I want to create a topic', () => {
    it('should create a topic', async () => {
      const createTopicDto: CreateTopicDto = { Title: 'New Topic', Description: 'Description' };
      const courseId = 'courseId';
      mockTopicService.create.mockResolvedValue({ ...createTopicDto, courseId });
      
      const result = await controller.create(courseId, createTopicDto);
      expect(result).toEqual({ ...createTopicDto, courseId });
      expect(mockTopicService.create).toHaveBeenCalledWith({ ...createTopicDto, courseId });
    });
  });

  describe('as an admin,I want to update a topic', () => {
    it('should update a topic', async () => {
      const updateTopicDto: UpdateTopicDto = { Title: 'Updated Title' };
      const id = '1';
      mockTopicService.updateTopic.mockResolvedValue({ ...updateTopicDto, id });
      
      const result = await controller.update(id, updateTopicDto);
      expect(result).toEqual({ ...updateTopicDto, id });
      expect(mockTopicService.updateTopic).toHaveBeenCalledWith(id, updateTopicDto);
    });
  });

  describe('as an admin,I want to patch a topic', () => {
    it('should partially update a topic', async () => {
      const id = '1';
      const partialUpdateDto: Partial<UpdateTopicDto> = { Description: 'Updated Description' };
      mockTopicService.patchTopic.mockResolvedValue({ ...partialUpdateDto, id });
      
      const result = await controller.patch(id, partialUpdateDto);
      expect(result).toEqual({ ...partialUpdateDto, id });
      expect(mockTopicService.patchTopic).toHaveBeenCalledWith(id, partialUpdateDto);
    });
  });

  describe('as an admin,I want to delete a topic', () => {
    it('should delete a topic', async () => {
      const id = '1';
      mockTopicService.deleteTopic.mockResolvedValue(undefined);
      
      const result = await controller.deleteTopic(id);
      expect(result).toBeUndefined();
      expect(mockTopicService.deleteTopic).toHaveBeenCalledWith(id);
    });
  });

  describe('as an admin,I want to findAllTopics', () => {
    it('should find all topics by courseId', async () => {
      const courseId = 'courseId';
      const topics = [{ Title: 'Topic 1' }, { Title: 'Topic 2' }];
      mockTopicService.findAllTopicsByCourse.mockResolvedValue(topics);
      
      const result = await controller.findAllTopics(courseId);
      expect(result).toEqual(topics);
      expect(mockTopicService.findAllTopicsByCourse).toHaveBeenCalledWith(courseId);
    });
  });

  describe('as an admin,I want to findOneTopic', () => {
    it('should find a topic by id', async () => {
      const id = '1';
      const topic = { Title: 'Test Topic', id };
      mockTopicService.findOneTopic.mockResolvedValue(topic);
      
      const result = await controller.findOneTopic(id);
      expect(result).toEqual(topic);
      expect(mockTopicService.findOneTopic).toHaveBeenCalledWith(id);
    });
  });
});
