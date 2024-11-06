/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Post,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from '../lesson/dto/update-lesson.dto';

@Controller('lesson')
@ApiTags('Lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post(':topic_id')
  @ApiOperation({ summary: 'Create a Lesson' })
  async createLesson(@Param('topic_id') topic_id:string, @Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createNew(createLessonDto);
  }

  // @Post(':course_id')
  // @ApiOperation({ summary: 'Create Topic' })
  // async create(
  //   @Param('course_id') course_id: string,
  //   @Body() body: CreateTopicDto,
  // ) {
  //   return this.topicService.create({ ...body, courseId: course_id });
  // }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update Lesson' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateLessonDto: UpdateLessonDto,
  // ) {
  //   return this.lessonService.updateLesson(id, updateLessonDto);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially Update Lesson' })
  @ApiBody({ type: UpdateLessonDto }) // Use the new DTO here
  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: UpdateLessonDto,
  ) {
    return this.lessonService.patchLesson(id, partialUpdateDto);
  }

  @Delete(':lesson_id')
  @ApiOperation({ summary: 'Delete a Lesson' })
  async deleteLesson(@Param("lesson_id") lesson_id: string) {
    return this.lessonService.deleteLesson(lesson_id);
  }
  @Get()
  @ApiOperation({ summary: 'Get all Lessons under different topics' })
  async findAllLessons() {
    return await this.lessonService.findAllLessons();
  }

  @Get(':lessonId')
@ApiOperation({ summary: 'Get a particular Lesson under a specific Topic' })

async findLessonById(
@Param('lessonId') lessonId: string
) {
  return await this.lessonService.findLessonById(lessonId);
}

// @Get(':lessonId/content')
// @ApiOperation({ summary: 'Get Content of a Lesson by lessonId' })
// async getLessonContent(@Param('lessonId') lessonId: string) {
//   return this.lessonService.findContentByLessonId(lessonId);
// }

}
