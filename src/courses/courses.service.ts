/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async deleteCourse(id: string) {
        const course = await this.prisma.course.delete({
            where: { id: id },
        });
        if (!course) {
            throw new NotFoundException(`Coursee with ID ${id} not found`)
        }

        return course
    }
}
