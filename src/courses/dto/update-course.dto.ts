import { IsString, IsOptional, IsArray, ValidateNested, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { AssessmentMode, CourseStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from "@nestjs/swagger";
import { CreateCourseDto } from "./create-course.dto";



export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
