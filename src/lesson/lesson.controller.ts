/* eslint-disable prettier/prettier */
import { Controller, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';

@Controller('lesson')
@ApiTags('Lessons')
export class LessonController {
    constructor(private lessonService: LessonService) {}

    @Delete(':lesson_id')
    @ApiOperation({summary: 'Delete a Lesson'})
    async deleteLesson(lesson_id: string) {
        return this.lessonService.deleteLesson(lesson_id);
    }
}
