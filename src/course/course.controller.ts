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

<<<<<<< HEAD
    @Get()
    async findAll() {
        return await this.courseSerivce.findAll();

    }
=======
  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }
>>>>>>> aab71746a72d651879b7228d23dfdf30a19d7da0
}
