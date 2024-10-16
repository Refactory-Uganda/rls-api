// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(dto: CreateCourseDto) {
    try {
      // Create a new course in the database
      const course = await this.prisma.course.create({
        data: {
          courseTitle: dto.courseTitle,
          courseDescription: dto.courseDescription,
          courseDuration: dto.courseDuration,
          modules: {
            create: dto.modules?.map(module => ({ title: module })) || [], // Handling modules relation
          },
        },
      });

      // Return a successful response with the created course data
      return {
        status: HttpStatus.CREATED,
        message: `Course ${dto.courseTitle} created successfully`,
        data: course,  // Return the newly created course object
      };

    } catch (error) {
      // Handle and throw the error
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Failed to create course',
          error: error.message,  // Include the error message for debugging
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
