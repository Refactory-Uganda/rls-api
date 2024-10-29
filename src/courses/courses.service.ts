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
  //   try {
  //     return await this.prisma.course.update({
  //       where: { id },
  //       data: {
  //         Title: updateCourseDto.Title,
  //         Description: updateCourseDto.Description,
  //         Duration: updateCourseDto.Duration,
  //         topics: {
  //           update: updateCourseDto.topics?.map((topic) => ({
  //             where: { id: topic.id },
  //             data: {
  //               Title: topic.Title,
  //               Description: topic.Description,
  //               Lesson: {
  //                 update: topic.lessons?.map((lesson) => ({
  //                   where: { id: lesson.id },
  //                   data: {
  //                     title: lesson.title,
  //                     text: lesson.text,
  //                   },
  //                 })) || [], // send empty array if undefined
  //               },
  //             },
  //           })) || [], // send empty array if no topics
  //         },
  //       },
  //       include: {
  //         topics: {
  //           include: { Lesson: true }
  //         }
  //       }
  //     });
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



  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { topics: { include: { Lesson: true } } }, // Include lessons
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Update course fields
    const updatedCourse = await this.prisma.course.update({
      where: { id },
      data: {
        Title: updateCourseDto.Title,
        Description: updateCourseDto.Description,
        Duration: updateCourseDto.Duration,
        status: updateCourseDto.status,
        topics: {
          // Loop through topics to handle updates
          upsert: updateCourseDto.topics?.map(topic => ({
            where: { id: topic.id },
            update: {
              Title: topic.Title,
              Description: topic.Description,
              Lesson: {
                // Loop through lessons to handle updates
                upsert: topic.lessons?.map(lesson => ({
                  where: { id: lesson.id },
                  update: {
                    title: lesson.title,
                    text: lesson.text,
                  },
                  create: {
                    title: lesson.title,
                    text: lesson.text,
                    topicId: topic.id,
                  },
                })),
              },
            },
            create: {
              Title: topic.Title,
              Description: topic.Description,
              Lesson: {
                create: topic.lessons?.map(lesson => ({
                  title: lesson.title,
                  text: lesson.text,
                  topicId: topic.id,
                })),
              },
            },
          })),
        },
      },
      include: { topics: { include: { Lesson: true } } }, // Include lessons in response
    });

    // try {
    //   const updatedcourse = await this.prisma.course.update({...});
    //   console.log('updated course:', updatedCourse)
    // }catch (error){
    //   console.error('Error updating course:', error)
    // }
    console.log(updateCourseDto);


    return updatedCourse;
  }



  async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
    try {
      return await this.prisma.course.update({
        where: { id },
        data: {
          Title: partialUpdateDto.Title,
          Description: partialUpdateDto.Description,
          Duration: partialUpdateDto.Duration,
          topics: {
            update: partialUpdateDto.topics?.map((topic) => ({
              where: { id },
              data: {
                Title: topic.Title,
                Description: topic.Description,
              },
            })),
          },
        },
      });
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
        const lessonData = topic.lessons;
  
        // Prepare the topic update data
        const topicUpdateData: any = {
          where: {
            id: topic.id,
          },
          data: {},
        };
  
        if (topic.Title) {
          topicUpdateData.data.Title = topic.Title;
        }
        if (topic.Description) {
          topicUpdateData.data.Description = topic.Description;
        }
  
        // If lesson data exists and there's an existing lesson
        if (lessonData && existingTopic?.Lesson?.[0]?.id) {
          topicUpdateData.data.Lesson = {
            update: {
              where: {
                id: existingTopic.Lesson[0].id,
              },
              data: {
                Lesson: {
                  update: lessonData.map(lesson => ({
                    where: { id: lesson.id },
                    data: {
                      ...(lesson.title && { title: lesson.title }),
                      ...(lesson.text && { text: lesson.text }),
                    },
                  })),
                },
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
            ...(updateData.Title && { Title: updateData.Title }),
            ...(updateData.Description && { Description: updateData.Description }),
            ...(updateData.Duration && { Duration: updateData.Duration }),
            ...(updateData.status && { status: updateData.status }),
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
        ...(updateData.Title && { Title: updateData.Title }),
        ...(updateData.Description && { Description: updateData.Description }),
        ...(updateData.Duration && { Duration: updateData.Duration }),
        ...(updateData.status && { status: updateData.status }),
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
  

  // Find all courses with pagination
  async findAll(page: number = 1, limit: number = 6) {

    try {
      const skip = (page - 1) * limit;
      const courses = await this.prisma.course.findMany({
        skip,
        take: limit,
        include: {
          topics: { 
            include: { Lesson: true } 
          }
        }
      });

      const totalCourses = await this.prisma.course.count();

      return {
        data: courses,
        total: totalCourses,
        page,
        lastPage: Math.ceil(totalCourses / limit),
      };
    } catch (error) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  }

  // Method to fetch a single course by ID
  async findOne(id: string) {
    try {
      return await this.prisma.course.findUnique({
        where: { id: id },
        include: {
          topics: {
            include: { Lesson: true }
          }
        }

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
