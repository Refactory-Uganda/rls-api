/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import { Controller, Put, Patch, Param, Body } from '@nestjs/common';
import { TopicService } from './topic.service';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topic/:id')
export class TopicController {
constructor(private readonly topicService: TopicService) {}

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
}
