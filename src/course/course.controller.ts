/* eslint-disable prettier/prettier */
import { Controller, Delete } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly courseSerivce: CourseService) {}

    @Delete()
    async deleteCourse() {
        return await this.courseSerivce.removeCourse();
    }
}
