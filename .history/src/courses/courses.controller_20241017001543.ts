import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';


@Controller('courses')
export class CoursesController {}

export class CourseController {
    constructor(private readonly courseService: CoursesService) {} 
  
    @Get() 
    async findAll() {
      return await this.courseService.findAll(); 
    }
  
    @Get(':id') // Route to get a course by ID
    async findOne(@Param('id') id: string) {
      return await this.courseService.findOne(id); // Call to the service's findOne method
    }
  }
