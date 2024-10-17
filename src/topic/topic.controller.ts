/* eslint-disable prettier/prettier */
// src/topics/topics.controller.ts
import { Body, Controller, Post, Param, Delete } from '@nestjs/common';
import { TopicService } from './topic.service'; 
import { Topic } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}


  @Post(':courseId')
  @ApiOperation({ summary: 'Create Topic' })
  async create(
    @Param('courseId') courseId: string,
    @Body() body: CreateTopicDto,
  ): Promise<Topic> {
    return this.topicService.create({ ...body, courseId });
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete Topic'})
    deleteTopic(@Param('id') id: string) {
        return this.topicService.deleteTopic(id);
    }
}


