/* eslint-disable prettier/prettier */
import { Controller, Delete, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Delete(':id')
    async deleteCourse(@Param('id') id: string) {
        return await this.coursesService.deleteCourse(id);
    }
}
