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

  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }
  @Get(':id')
  async findOne() {
    return await this.courseService.findOne();
  }

  @Put(':id')
  async updateCourse() {
    return await this.courseService.updateCourse();
  }

  @Delete(':id')
  async deleteCourse() {
    return await this.courseService.removeCourse();
  }
}
