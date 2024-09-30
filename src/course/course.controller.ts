/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/createCourseDto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto){
    return this.courseService.createCourse(createCourseDto);
  }

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
