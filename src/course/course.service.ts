/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/createCourseDto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {} 

  async createCourse(createCourseDto: CreateCourseDto){
    const { courseTitle, courseDescription, courseDuration, modules } = createCourseDto;

    modules.forEach((module, index) => {
      if (!module.moduleTitle) {
        throw new Error(`Module at index ${index} is missing moduleTitle`);
      }
      if (!module.moduleDescription) {
        throw new Error(`Module at index ${index} is missing moduleDescription`);
      }
      if (!module.facilitator || !module.facilitator.name || !module.facilitator.email) {
        throw new Error(`Module at index ${index} is missing facilitator information`);
      }
      if (!module.contents || module.contents.length === 0) {
        throw new Error(`Module at index ${index} is missing contents`);
      }
    })

    return await this.prisma.course.create({ 
      data: {
        courseTitle,
        courseDescription,
        courseDuration,
        modules: {
          create: modules.map(module => ({
            moduleTitle: module.moduleTitle,
            moduleDescription:module.moduleDescription,
            facilitator: module.facilitator
            ? {
              create: {
                name: module.facilitator.name,
                email: module.facilitator.email
              },
            }
            : undefined,
            contents: {
              create: module.contents.map(content => ({
                type: content.type,
                data: content.data
              })),
            },
          })),
        },
      },
      include: {
        modules: {
          include: {
            facilitator: true,
            contents: true,
          },
        },
      },
    });
  }

  updateCourse(): string {
    return 'Course updated';
  }
  findAll(): string {
    return 'Displaying all courses';
  }
  findOne(): string {
    return 'Displaying one course';
  }

  removeCourse(): string {
    return 'Course removed';
  }
}
