import { Controller } from '@nestjs/common';

@Controller('courses')
export class CoursesController {}


@Get()
async findAll() {
  return await this.courseService.findAll(); // Calls the service to retrieve all courses
}

@Get(':id')
async findOne(@Param('id') id: string) {
  return await this.courseService.findOne(id); // Calls the service to retrieve a specific course by ID
}
