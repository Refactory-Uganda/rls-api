/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) {}


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
