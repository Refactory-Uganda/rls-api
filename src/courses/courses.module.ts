// src/course/course.module.ts
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseController } from './courses.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CourseController],
  providers: [CoursesService, PrismaService],
})
export class CoursesModule {}
