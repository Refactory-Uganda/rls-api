/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lesson')
@ApiTags('Lessons')
export class LessonController {
    constructor(private lessonService: LessonService) {}

    @Post()
    @ApiOperation({summary: 'Create a Lesson'})
    async createLesson(@Body() createLessonDto: CreateLessonDto) {
        return this.lessonService.createLesson(createLessonDto);
    }

    @Delete(':lesson_id')
    @ApiOperation({summary: 'Delete a Lesson'})
    async deleteLesson(lesson_id: string) {
        return this.lessonService.deleteLesson(lesson_id);
    }
}
