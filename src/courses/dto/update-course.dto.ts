/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AssessmentMode, CourseStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
// import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';

/* eslint-disable prettier/prettier */

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
