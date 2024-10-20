/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) {}

    async updateLesson(id: string, updateLessonDto: UpdateLessonDto) {
        try {
          return await this.prisma.lesson.update({
            where: { id },
            data: updateLessonDto,
          });
        } catch (error) {
          throw new Error(`Error updating lesson with ID ${id}: ${error.message}`);
        }
      }
    
      async patchLesson(id: string, partialUpdateDto: Partial<UpdateLessonDto>) {
        try {
          return await this.prisma.lesson.update({
            where: { id },
            data: partialUpdateDto,
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
}
