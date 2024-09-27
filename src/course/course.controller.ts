/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Put } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Delete()
    async deleteCourse() {
        return await this.courseService.removeCourse();
    }

    @Put()
    async updateCourse() {
        return await this.courseService.updateCourse();
    }

    @Get()
    async findAll() {
         return await this.courseService.findAll();

    }
}
