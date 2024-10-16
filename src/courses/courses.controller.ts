/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import { Controller, Patch, Put, Param, Post, Body,  HttpCode, HttpStatus } from '@nestjs/common';
import { CourseService } from './courses.service';
import { UpdateCourseDto } from '../modules/dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Put(':id')
  async update(
      @Param('id') id: string,
      @Body() updateCourseDto: UpdateCourseDto,
  ) {
      return this.courseService.updateCourse(id, updateCourseDto);
  }
  @Patch(':id')
  async patch(
      @Param('id') id: string,
      @Body() partialUpdateDto: Partial<UpdateCourseDto>,
  ) {
      return this.courseService.patchCourse(id, partialUpdateDto);
  }
}
