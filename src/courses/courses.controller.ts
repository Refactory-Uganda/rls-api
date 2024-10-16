/* eslint-disable prettier/prettier */
import { Controller, Patch, Put, Param, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { UpdateCourseDto } from '../modules/dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return this.coursesService.updateCourse(id, updateCourseDto);
    }
    @Patch(':id')
    async patch(
        @Param('id') id: string,
        @Body() partialUpdateDto: Partial<UpdateCourseDto>,
    ) {
        return this.coursesService.patchCourse(id, partialUpdateDto);
    }
}

