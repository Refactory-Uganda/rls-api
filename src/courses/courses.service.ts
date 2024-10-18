/* eslint-disable prettier/prettier */
// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) { }

  async createCourse(dto: CreateCourseDto) {
    try {
      // Check if a course with the same title already exists
      const existingCourse = await this.prisma.course.findUnique({
        where: {
          Title: dto.Title,
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

      // Handle topics creation if topics are provided
      const topicsData = dto.topics && Array.isArray(dto.topics)
      ? dto.topics.map((topic) => ({
          Title: topic.Title,
          Description: topic.Description,
        }))
      : []; // Default to an empty array if no topics are provided


      // Create a new course in the database
      const course = await this.prisma.course.create({
        data: {
          Title: dto.Title,
          Description: dto.Description,
          Duration: dto.Duration,
          topics: {
            create: topicsData, // Use the processed topics data
          },
        },
        include: {
          topics: true,
        }
      });

      // Return a successful response with the created course data
      return {
        status: HttpStatus.CREATED,
        message: `Course ${dto.Title} created successfully`,
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
      include: { topics: true },
      data: updateCourseDto,
    });
  }


  async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
    return this.prisma.course.update({
      where: { id },
      include: { topics: true },
      data: partialUpdateDto,
    });
  }
  async findAll() {
    try {
      return await this.prisma.course.findMany({
        include: { topics: true }
      });
    } catch (error) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  }

  // Method to fetch a single course by ID
  async findOne(id: string) {
    try {
      return await this.prisma.course.findUnique({
        where: { id: id },
        include: { topics: true }

      });
    } catch (error) {
      throw new Error(`Error fetching course with ID ${id}: ${error.message}`);
    }
  }

  async deleteCourse(id: string) {
    try {
      return await this.prisma.course.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(`Error deleting course with ID ${id}: ${error.message}`);
    }
  }
}
