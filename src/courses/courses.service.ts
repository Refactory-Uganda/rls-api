/* eslint-disable prettier/prettier */
// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) { }

  async createCourseDraft(dto: CreateCourseDto) {
    // check for topics
    const hasTopics = dto.topics && dto.topics.length > 0;

    // set to draft if no topics
    const status = hasTopics ? dto.status ?? `DRAFT` : `DRAFT`;

    return await this.prisma.course.create({
      data: {
        Title: dto.Title,
        Description: dto.Description,
        Duration: dto.Duration,
        status,
        topics: {
          create: dto.topics,
        },
      },
    })
  }

  async updateCourse(id:string, dto: UpdateCourseDto) {
    if (!id) {
      throw new Error('Course ID must be provided');
  }
  // Check if the course exists
  const course = await this.prisma.course.findUnique({
      where: {
          id: id,  // Ensure id is not undefined
      }
  });

    if (!course) {
        throw new Error('Course not found');
    }

    // Check for topics and set status accordingly
    const hasTopics = dto.topics && dto.topics.length > 0;
    const status = hasTopics ? dto.status ?? course.status : 'DRAFT';

    return await this.prisma.course.update({
        where: { id: dto.id },
        data: {
            Title: dto.Title ?? course.Title,
            Description: dto.Description ?? course.Description,
            Duration: dto.Duration ?? course.Duration,
            status,
            topics: {
                deleteMany: {}, // Clear existing topics if needed
                create: dto.topics ? dto.topics : [],
            },
        },
    });
}

  async publishCourse(id: string) {
    // check for topis
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { topics: true }
    });

    if (!course.topics || course.topics.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Cannot publish a course without topics',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.course.update({
      where: { id },
      data: {
        status: `PUBLISHED`,
      },
    });
  }

  async draftCourse(id: string) {
    return await this.prisma.course.update({
      where: { id },
      data: {
        status: `DRAFT`,
      },
    });
  }

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
          lessons: topic.lessons
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


  // async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
  //   try {
  //     const existingCourse = await this.prisma.course.findUnique({
  //       where: { id },
  //       include: { topics: { include: { Lesson: true } } }, // Include topics and lessons to check if the course exists
  //     });
  
  //     if (!existingCourse) {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.NOT_FOUND,
  //           message: 'Course not found',
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  
  //     // Prepare topics and lessons data
  //     const topicsData = updateCourseDto.topics?.map((topic) => ({
  //       where: { id: topic.id },
  //       data: {
  //         Title: topic.Title,
  //         Description: topic.Description,
  //         Lesson: {
  //           upsert: topic.lessons?.map((lesson) => ({
  //             where: { id: lesson.id },
  //             create: {
  //               title: lesson.title,
  //               text: lesson.text,
  //               topicId: topic.id,
  //             },
  //             update: {
  //               title: lesson.title,
  //               text: lesson.text,
  //             },
  //           })),
  //         },
  //       },
  //     }));
  
  //     const updatedCourse = await this.prisma.course.update({
  //       where: { id },
  //       data: {
  //         Title: updateCourseDto.Title,
  //         Description: updateCourseDto.Description,
  //         Duration: updateCourseDto.Duration,
  //         topics: {
  //           update: topicsData,
  //         },
  //       },
  //       include: {
  //         topics: {
  //           include: { Lesson: true },
  //         },
  //       },
  //     });
  
  //     return {
  //       status: HttpStatus.OK,
  //       message: `Course ${updateCourseDto.Title} updated successfully`,
  //       data: updatedCourse,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'Failed to update course',
  //         error: error.message,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
  
  
  
  
  
  async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
    try {
      const existingCourse = await this.prisma.course.findUnique({
        where: { id },
        include: { topics: { include: { Lesson: true } } },
      });
  
      if (!existingCourse) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Course not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
  
      const topicsData = partialUpdateDto.topics?.map((topic) => ({
        where: { id: topic.id },
        data: {
          Title: topic.Title,
          Description: topic.Description,
          Lesson: {
            upsert: topic.lessons?.map((lesson) => ({
              where: { id: lesson.id },
              create: {
                title: lesson.title,
                text: lesson.text,
                topicId: topic.id,
              },
              update: {
                title: lesson.title,
                text: lesson.text,
              },
            })),
          },
        },
      }));
  
      const updatedCourse = await this.prisma.course.update({
        where: { id },
        data: {
          Title: partialUpdateDto.Title,
          Description: partialUpdateDto.Description,
          Duration: partialUpdateDto.Duration,
          topics: {
            update: topicsData,
          },
        },
        include: {
          topics: {
            include: { Lesson: true },
          },
        },
      });
  
      return {
        status: HttpStatus.OK,
        message: `Course ${partialUpdateDto.Title} patched successfully`,
        data: updatedCourse,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Failed to partially update course',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  
  
  
  


  // async findCourseTopics() {
  //   try {
  //     return await this.prisma.course.findMany({
  //       include: {
  //         topics: true,
  //       },
  //     });
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'Failed to fetch course topics',
  //         error: error.message,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );}
  // }


  async findAll() {
    try {
      return await this.prisma.course.findMany({
        include: { 
          topics: {
          include: { Lesson: true }
        }
      }
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
        include: { topics: {
          include: {Lesson:true}
        } }

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
