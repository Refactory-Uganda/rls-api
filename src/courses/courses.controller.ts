/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import { Controller, Delete, Post, Body, Get, Param, HttpCode, HttpStatus, Patch, Query } from '@nestjs/common';
import {  CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Course } from '@prisma/client';

@Controller('courses')
@ApiTags('Course')
export class CourseController {
  createCourseDraft(createCourseDto: CreateCourseDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly courseService: CourseService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create a Course'})
  // @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  // async createCourse(@Body() createCourseDto: CreateCourseDto) {
  //   return this.courseService.createCourse(createCourseDto);
  // }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a Course'})
    async deleteCourse(@Param('id') id: string) {
        return await this.courseService.deleteCourse(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially update a Course' })
    @ApiBody({ type: UpdateCourseDto })
    async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    ) {
    return this.courseService.updateCourse(id, updateCourseDto);
    }

  // @Get()
  // @ApiOperation({ summary: 'Get all Courses' })
  // async findAll(
  //   @Query('page') page: number =1,
  //   @Query('limit') limit: number = 6
  // ) {
  //   return await this.courseService.findAll(Number(page),Number(limit));
  // }

  @Get() 
  @ApiOperation({summary: 'Get all Courses'})
  async findAll() {
    return await this.courseService.findAll(); 
  }


  @Get(':id') 
  @ApiOperation({summary: 'Get a Course by ID'})
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id); 
  }

  // get topics specific to a course 
  // @Get(':id/topics')
  // @ApiOperation({summary: 'Get Topics for a Course'})
  // async getTopics() {
  //   return await this.courseService.findCourseTopics();
  // }

  @Post()
  @ApiOperation({ summary: 'Create a Course draft'})
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourseP_D(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourseDraft(createCourseDto);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a Course'})
  @HttpCode(HttpStatus.OK) // Set the response status code to 200
  async publishCourse(@Param('id') id: string) {
    return this.courseService.publishCourse(id);
  }

  @Patch(`:id/draft`)
  @ApiOperation({ summary: 'Draft a Course'})
  @HttpCode(HttpStatus.OK) // Set the response status code to 200
  async draftCourse(@Param('id') id: string) {
    return this.courseService.draftCourse(id);
  }

}
