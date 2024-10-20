/* eslint-disable prettier/prettier */
import { Controller, Delete, Put, Body, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { UpdateLessonDto } from '../lesson/dto/update-lesson.dto';

@Controller('lesson')
@ApiTags('Lessons')
export class LessonController {
    constructor(private lessonService: LessonService) {}

    
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
    @ApiOperation({summary: 'Delete a Lesson'})
    async deleteLesson(lesson_id: string) {
        return this.lessonService.deleteLesson(lesson_id);
    }
}
