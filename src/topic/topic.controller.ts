// src/topics/topics.controller.ts
import { Body, Controller, Post, Param } from '@nestjs/common';
import { TopicsService } from './topic.service'; // Correct import
import { Topic } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topic')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}


  @Post(':courseId')
  async create(
    @Param('courseId') courseId: string,
    @Body() body: CreateTopicDto,
  ): Promise<Topic> {
    return this.topicsService.create({ ...body, courseId });
  }
}
