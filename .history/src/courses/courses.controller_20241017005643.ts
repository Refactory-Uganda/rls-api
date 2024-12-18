// src/course/course.controller.ts
import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }
  @Get() 
  async findAll() {
    return await this.courseService.findAll(); 
  }

  @Get(':id') 
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id); 
  }
}
