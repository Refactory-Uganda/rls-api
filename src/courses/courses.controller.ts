/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import { Controller, Delete, Post, Body, Get, Param, HttpCode, HttpStatus, Put, Patch } from '@nestjs/common';
import {  CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

    @Delete(':id')
    async deleteCourse(@Param('id') id: string) {
        return await this.courseService.deleteCourse(id);
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
  @Get() 
  async findAll() {
    return await this.courseService.findAll(); 
  }

  @Get(':id') 
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id); 
  }
}
