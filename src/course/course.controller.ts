/* eslint-disable prettier/prettier */
import { Controller, Delete, Put, Body, Post, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
      return this.courseService.create(createCourseDto);
    }

    @Get()
    async findAll() {
      return this.courseService.findAll();
    }

    @Delete()
    async deleteCourse() {
        return await this.courseService.removeCourse();
    }

    @Put()
    async updateCourse() {
        return await this.courseService.updateCourse();
    }
}
