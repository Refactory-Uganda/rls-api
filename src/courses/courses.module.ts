/* eslint-disable prettier/prettier */
// src/course/course.module.ts
import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from './images.service';
import { FacilitatorService } from './faculitator.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService,ImageService,FacilitatorService],
})
export class CoursesModule {}
