/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) {}

    // async createLesson(createLessonDto: CreateLessonDto) {
    //     const lesson = await this.prisma.lesson.create({
    //         data: {
    //             title: createLessonDto.title,
    //             content: createLessonDto.content,
    //             topicId: createLessonDto.topicId,
              
    //         },
    //     });

    //     return lesson
    // }


    async createNew(createLessonDto: CreateLessonDto) {
      const lesson = await this.prisma.lesson.create({
        data: {
          title: createLessonDto.title,
          topicId: createLessonDto.topicId,
          // content: {
          //   create: {
          //     notes: createLessonDto.content,
          //   },
          // },
        },
      });
      return lesson;
    }

    async updateLesson(id: string, updateLessonDto: UpdateLessonDto) {
        try {
          return await this.prisma.lesson.update({
            where: { id },
            data: 
            {
              title: updateLessonDto.title,
              topicId: updateLessonDto.topicId,
              // content: {
              //   update: {
              //     where: { id: string},
                  
              //   },
              // },
            },
          });
        } catch (error) {
          throw new Error(`Error updating lesson with ID ${id}: ${error.message}`);
        }
      }
    
    async patchLesson(id: string, partialUpdateDto: Partial<UpdateLessonDto>) {
        try {
          return await this.prisma.lesson.update({
            where: { id },
            data: 
            {
              title: partialUpdateDto.title,
              topicId: partialUpdateDto.topicId,
              // content: {
              //   update: {
              //     where: { id: string},
                  
              //   },
              // },
            },
          });
        } catch (error) {
          throw new Error(
            `Error partially updating lesson with ID ${id}: ${error.message}`,
          );
        }
      }


    async deleteLesson(id:string) {
        const lesson = await this.prisma.lesson.delete(
            {
                where: {
                    id: id
                }
            }
        )
        return lesson;
    }
    async findAllLessons() {
      return this.prisma.lesson.findMany({
      
    });
    }
    async findLessonById(lessonId: string) {
      return this.prisma.lesson.findUnique({
        where: {
          id: lessonId,
        
        },
      });
    }
    
}
