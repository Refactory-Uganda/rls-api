/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Param, Delete, Patch, Put, Get} from '@nestjs/common';
import { TopicService } from './topic.service'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post(':course_id')
  @ApiOperation({ summary: 'Create Topic' })
  async create(
    @Param('course_id') course_id: string,
    @Body() body: CreateTopicDto,
  ) {
    return this.topicService.create({ ...body, courseId: course_id });
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


@Get()
@ApiOperation({ summary: 'Get all Topics by courseId' })
async findAllTopics(@Param('courseId') courseId: string) {
  return await this.topicService.findAllTopicsByCourse(courseId);
}
@Get(':id')
@ApiOperation({ summary: 'Get Topic by id' })
async findOneTopic(@Param('id') id: string) {
  return await this.topicService.findOneTopic(id);
}
}