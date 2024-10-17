// src/topics/topics.controller.ts
import { Body, Controller, Post, Param, Delete } from '@nestjs/common';
import { TopicService } from './topic.service'; // Correct import
import { Topic } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}


  @Post(':courseId')
  async create(
    @Param('courseId') courseId: string,
    @Body() body: CreateTopicDto,
  ): Promise<Topic> {
    return this.topicService.create({ ...body, courseId });
  }


  @Delete(':id')
    deleteTopic(@Param('id') id: string) {
        return this.topicService.deleteTopic(id);
    }
}


