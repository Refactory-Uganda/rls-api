/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import { Controller, Delete, Param, Post, Body,  HttpCode, HttpStatus } from '@nestjs/common';
import {  CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CoursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

    @Delete(':id')
    async deleteCourse(@Param('id') id: string) {
        return await this.courseService.deleteCourse(id);
    }
}
