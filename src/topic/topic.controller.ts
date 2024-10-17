/* eslint-disable prettier/prettier */
// src/topics/topics.controller.ts
import { Body, Controller, Post, Param, Delete, Patch, Put } from '@nestjs/common';
import { TopicService } from './topic.service'; 
import { Topic } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

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

  @Put(':id')

  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicService.updateTopic(id, updateTopicDto);
  }

  @Patch(':id')

  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateTopicDto>,
  ) {
    return this.topicService.patchTopic(id, partialUpdateDto);
  }


  @Delete(':id')
    deleteTopic(@Param('id') id: string) {
        return this.topicService.deleteTopic(id);
    }
}
