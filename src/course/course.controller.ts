/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/createCourseDto';
import { UpdateCourseDto } from './dto/updateCourseDto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto){
    return this.courseService.createCourse(createCourseDto);
  }

  @Patch(':id')
  courseUpdate(
  @Param('id') id: string,
  @Body() updateCourseDto: UpdateCourseDto 
) {
  return this.courseService.updateCourse(id, updateCourseDto);
}


  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }

  @Put(':id')
  async updateCourse(@Param('id') id:string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id:string) {
    return await this.courseService.removeCourse(id);
  }
}
