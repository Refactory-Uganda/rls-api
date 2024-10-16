/* eslint-disable prettier/prettier */
// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCourseDto } from '../modules/dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(dto: CreateCourseDto) {
    try {
        // Check if a course with the same title already exists
        const existingCourse = await this.prisma.course.findUnique({
            where: {
                courseTitle: dto.courseTitle,
            },
        });

        if (existingCourse) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'A course with this title already exists',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
      // Create a new course in the database
      const course = await this.prisma.course.create({
        data: {
          courseTitle: dto.courseTitle,
          courseDescription: dto.courseDescription,
          courseDuration: dto.courseDuration,
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

  async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
    });
}


async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
    return this.prisma.course.update({
        where: { id },
        data: partialUpdateDto,
    });
}
}
