/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Prisma } from '@prisma/client';
// import { Lesson } from '@prisma/client';

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) {}

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
      include: { quiz: true }
    });
    }
    async findLessonById(lessonId: string) {
      return this.prisma.lesson.findUnique({
        where: {
          id: lessonId,
        },
        include: {
            quiz: true
          }
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
