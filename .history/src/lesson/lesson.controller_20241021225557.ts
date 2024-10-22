/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from '../lesson/dto/update-lesson.dto';

@Controller('lesson')
@ApiTags('Lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a Lesson' })
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Lesson' })
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonService.updateLesson(id, updateLessonDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially Update Lesson' })
  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateLessonDto>,
  ) {
    return this.lessonService.patchLesson(id, partialUpdateDto);
  }

  @Delete(':lesson_id')
  @ApiOperation({ summary: 'Delete a Lesson' })
  async deleteLesson(lesson_id: string) {
    return this.lessonService.deleteLesson(lesson_id);
  }
  @Get()
  @ApiOperation({ summary: 'Get all Lessons under different topics' })
  async findAllLessons() {
    return await this.lessonService.findAllLessons();
  }

  @Get('lessonId')
@ApiOperation({ summary: 'Get a particular Lesson under a specific Topic' })

async findLessonById(
  @Param('topicId') topicId: string,
  @Param('lessonId') lessonId: string
) {
  return await this.lessonService.findLessonById(topicId, lessonId);
}
}
