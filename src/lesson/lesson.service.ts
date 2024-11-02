/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Prisma } from '@prisma/client';
// import { Lesson } from '@prisma/client';

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) {}

    // async create(data: CreateLessonDto): Promise<Lesson> {
    //   const lesson = await this.prisma.topic.create({
    //     data: {
    //       title: data.title,
    //       text: data.text,
    //       topicId: data.topicId,
    //     },
    //     include: { topic: true },
    //   });
    //   return lesson;
    // }

    async createNew(createLessonDto: CreateLessonDto) {
      const lesson = await this.prisma.lesson.create({
        data: {
          title: createLessonDto.title,
          topicId: createLessonDto.topicId,
          text: createLessonDto.text
        },
        include: {
          topic:true
        }
      });
      return lesson;
    }

    // async updateLesson(id: string, updateLessonDto: UpdateLessonDto) {
    //     try {
    //       return await this.prisma.lesson.update({
    //         where: { id },
    //         data: 
    //         {
    //           title: updateLessonDto.title,
    //           text: updateLessonDto.text,
    //           topicId: updateLessonDto.topicId,
    //           // content: {
    //           //   update: {
    //           //     where: { id: string},
                  
    //           //   },
    //           // },
    //         },
    //       });
    //     } catch (error) {
    //       throw new Error(`Error updating lesson with ID ${id}: ${error.message}`);
    //     }
    //   }
    
    async patchLesson(id: string, partialUpdateDto: UpdateLessonDto) {
      try {
        const updateData: Prisma.LessonUpdateInput = {
          title: partialUpdateDto.title,
          text: partialUpdateDto.text,
        };
    
        return await this.prisma.lesson.update({
          where: { id },
          data: updateData,
        });
      } catch (error) {
        throw new Error(`Error partially updating lesson with ID ${id}: ${error.message}`);
      }
    }
    


    async deleteLesson(id:string) {
        const lesson = await this.prisma.lesson.delete(
            {
                where: {
                    id
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

    async findContentByLessonId(lessonId: string) {
      return this.prisma.lesson.findUnique({
        where: {
          id: lessonId,
        },
        select: {
          content: true, 
        },
      });
    }
    
}
