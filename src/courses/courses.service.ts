/* eslint-disable prettier/prettier */
// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
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
  //   const courseId = updateCourseDto.id;
  //   try {
  //     const existingCourse = await this.prisma.course.findUnique({
  //       where: { id: courseId },
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
  
  //     // const updatedCourse = await this.prisma.course.update({
  //     //   where: { id: courseId },
  //     //   data: {
  //     //     Title: updateCourseDto.Title,
  //     //     Description: updateCourseDto.Description,
  //     //     Duration: updateCourseDto.Duration,
  //     //     topics: {
  //     //       update: topicsData,
  //     //     },
  //     //   },
  //     //   include: {
  //     //     topics: {
  //     //       include: { Lesson: true },
  //     //     },
  //     //   },
  //     // });
  
  //     // Construct update data only if topics are provided
  //   const updateData: any = {
  //     Title: updateCourseDto.Title,
  //     Description: updateCourseDto.Description,
  //     Duration: updateCourseDto.Duration,
  //   };

  //   if (topicsData?.length) {
  //     updateData.topics = { update: topicsData };
  //   }

  //   const updatedCourse = await this.prisma.course.update({
  //     where: { id: courseId },
  //     data: updateData,
  //     include: {
  //       topics: {
  //         include: { Lesson: true },
  //       },
  //     },
  //   });

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
  
  // async updateCourse(id: string, updatedto: UpdateCourseDto) {
  //   // function updating lessons and topics
  //   const topicUpdate = updatedto.topics?.map((topic) => ({
  //     where: { id: topic.id },
  //     data: {
  //       Title: topic.Title,
  //       Description: topic.Description,
  //       Lesson: topic.lessons?.length ? {
  //         upsert: topic.lessons.map((lesson) => ({
  //           where: { id: lesson.id },
  //           create: {
  //             title: lesson.title,
  //             text: lesson.text,
  //             topicId: topic.id,
  //           },
  //           update: {
  //             title: lesson.title,
  //             text: lesson.text,
  //           },
  //         })),
  //       } : undefined, // Only include lessons if they are provided
  //     },
  //   }));

  //   // function updating all course components
  //   const updatedcourse = await this.prisma.course.update({
  //     where: { id: id },
  //     data: {
  //       Title: updatedto.Title,
  //       Description: updatedto.Description,
  //       Duration: updatedto.Duration,
  //       topics: {
  //         update: topicUpdate,
  //       },
  //     },
  //     include: {
  //       topics: {
  //         include: { Lesson: true },
  //       },
  //     },
  //   });

  //   console.log(updatedcourse);
  //   console.log(updatedto);
  //   return updatedcourse;
  // }
  
  


  // // latest
  // async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto) {
  //   // First, verify the course exists
  //   const existingCourse = await this.prisma.course.findUnique({
  //     where: { id: courseId },
  //     include: {
  //       topics: {
  //         include: {
  //           Lesson: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!existingCourse) {
  //     throw new NotFoundException(`Course with ID ${courseId} not found`);
  //   }

  //   // Prepare the update operation
  //   const updateOperation = {
  //     where: {
  //       id: courseId,
  //     },
  //     data: {
  //       Title: updateCourseDto.Title,
  //       Description: updateCourseDto.Description,
  //       Duration: updateCourseDto.Duration,
  //       // Only include topics update if there are topics to update
  //       ...(updateCourseDto.topics && {
  //         topics: {
  //           update: updateCourseDto.topics.map((topic) => ({
  //             where: { id: topic.id }, // Now we have the topic ID
  //             data: {
  //               Title: topic.Title,
  //               Description: topic.Description,
  //               // Only include Lesson update if there's lesson data
  //               ...(topic.Lesson && {
  //                 Lesson: {
  //                   upsert: Array.isArray(topic.Lesson) ? topic.Lesson.map((lesson) => ({
  //                     where: { id: lesson.id },
  //                     create: {
  //                       title: lesson.title,
  //                       text: lesson.text,
  //                       topicId: topic.id,
  //                     },
  //                     update: {
  //                       title: lesson.title,
  //                       text: lesson.text,
  //                     },
  //                   })) : [],
  //                 },
  //               }),
  //             },
  //           })),
  //         },
  //       }),
  //     },
  //     include: {
  //       topics: {
  //         include: {
  //           Lesson: true,
  //         },
  //       },
  //     },
  //   };

  //   try {
  //     return await this.prisma.course.update(updateOperation);
  //   } catch (error) {
  //     if (error.code === 'P2025') {
  //       throw new NotFoundException('One or more topics not found');
  //     }
  //     throw error;
  //   }
  // }

  
  
  // async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
  //   try {
  //     const existingCourse = await this.prisma.course.findUnique({
  //       where: { id },
  //       include: { topics: { include: { Lesson: true } } },
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
  
  //     const topicsData = partialUpdateDto.topics?.map((topic) => ({
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
  //         Title: partialUpdateDto.Title,
  //         Description: partialUpdateDto.Description,
  //         Duration: partialUpdateDto.Duration,
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
  //       message: `Course ${partialUpdateDto.Title} patched successfully`,
  //       data: updatedCourse,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'Failed to partially update course',
  //         error: error.message,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
  
  
  
  
  


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


  async updateCourse(courseId: string, updateData: UpdateCourseDto) {
    // Verify course exists
    const existingCourse = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        topics: {
          include: {
            Lesson: true,
          },
        },
      },
    });

    if (!existingCourse) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // If we're trying to update topics and lessons
    if (updateData.topics && Array.isArray(updateData.topics)) {
      // Get existing topic IDs for this course
      const existingTopics = await this.prisma.topic.findMany({
        where: {
          courseId: courseId,
        },
        select: {
          id: true,
          Lesson: {
            select: {
              id: true,
            },
          },
        },
      });

      const existingTopicIds = existingTopics.map(topic => topic.id);

      // Validate and prepare topics update with lessons
      const topicsUpdate = await Promise.all(updateData.topics.map(async (topic) => {
        if (!topic.id) {
          throw new BadRequestException('Topic ID is required for update');
        }

        if (!existingTopicIds.includes(topic.id)) {
          throw new BadRequestException(`Topic with ID ${topic.id} does not belong to this course`);
        }

        // Find existing lesson for this topic
        const existingTopic = existingTopics.find(et => et.id === topic.id);
        const lessonData = topic.Lesson;

        // Prepare the topic update data
        const topicUpdateData: any = {
          where: {
            id: topic.id,
          },
          data: {
            Title: topic.Title,
            Description: topic.Description,
          },
        };

        // If lesson data exists and there's an existing lesson
        if (lessonData && existingTopic?.Lesson?.[0]?.id) {
          topicUpdateData.data.Lesson = {
            update: {
              where: {
                id: existingTopic.Lesson[0].id,
              },
              data: {
                title: lessonData.title,
                text: lessonData.text,
              },
            },
          };
        }

        return topicUpdateData;
      }));

      // Perform the update
      try {
        return await this.prisma.course.update({
          where: {
            id: courseId,
          },
          data: {
            Title: updateData.Title,
            Description: updateData.Description,
            Duration: updateData.Duration,
            status: updateData.status,
            topics: {
              update: topicsUpdate,
            },
          },
          include: {
            topics: {
              include: {
                Lesson: true,
              },
            },
          },
        });
      } catch (error) {
        console.error('Update error:', error);
        if (error.code === 'P2025') {
          throw new NotFoundException('One or more topics or lessons not found');
        }
        throw error;
      }
    }

    // If no topics to update, just update the course details
    return await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        Title: updateData.Title,
        Description: updateData.Description,
        Duration: updateData.Duration,
        status: updateData.status,
      },
      include: {
        topics: {
          include: {
            Lesson: true,
          },
        },
      },
    });
  }

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
