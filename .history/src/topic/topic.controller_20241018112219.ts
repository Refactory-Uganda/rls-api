/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Param, Delete, Patch, Put, Get} from '@nestjs/common';
import { TopicService } from './topic.service'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topics')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post(':courseId')
  @ApiOperation({ summary: 'Create Topic' })
  async create(
    @Param('courseId') courseId: string,
    @Body() body: CreateTopicDto,
  ) {
    return this.topicService.create({ ...body, courseId });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Topic' })
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicService.updateTopic(id, updateTopicDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially Update Topic' })
  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateTopicDto>,
  ) {
    return this.topicService.patchTopic(id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Topic' })
  deleteTopic(@Param('id') id: string) {
    return this.topicService.deleteTopic(id);
  }


@Get('course/:courseId')
@ApiOperation({ summary: 'Get all Topics by courseId' })
async findAllTopics(@Param('courseId') courseId: string) {
  return await this.topicService.findAllTopicsByCourse(courseId);
}
}
