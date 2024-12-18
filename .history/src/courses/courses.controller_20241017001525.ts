import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';


@Controller('courses')
export class CoursesController {}

export class CourseController {
    constructor(private readonly courseService: CoursesService) {} 
  
    @Get() // Route to get all courses
    async findAll() {
      return await this.courseService.findAll(); // Call to the service's findAll method
    }
  
    @Get(':id') // Route to get a course by ID
    async findOne(@Param('id') id: string) {
      return await this.courseService.findOne(id); // Call to the service's findOne method
    }
  }
