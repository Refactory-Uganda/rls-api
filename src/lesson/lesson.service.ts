/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) {}

    async createLesson(createLessonDto: CreateLessonDto) {
        const lesson = await this.prisma.lesson.create({
            data: {
                title: createLessonDto.title,
                content: createLessonDto.content,
                topicId: createLessonDto.topicId,
            },
        });

        return lesson
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
