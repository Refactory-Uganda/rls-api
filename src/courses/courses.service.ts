/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCourseDto } from '../modules/dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(private readonly prisma: PrismaService) {}

    async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
        return this.prisma.course.update({
            where: { id },
            data: updateCourseDto,
        });
    }


    async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
        return this.prisma.course.update({
            where: { id },
            data: partialUpdateDto,
        });
    }
}
