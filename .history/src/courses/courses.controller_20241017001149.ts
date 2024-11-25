import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';


@Controller('courses')
export class CoursesController {}

@Get()
async findAll() {
  return await this.courseService.findAll();
}

