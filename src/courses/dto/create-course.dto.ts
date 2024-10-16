// src/course/dto/create-course.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  courseTitle: string; // Required field

  @IsOptional()
  @IsString()
  courseDescription?: string; // Optional field

  @IsString()
  courseDuration: string; // Required field

}
