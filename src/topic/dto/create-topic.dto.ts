/* eslint-disable prettier/prettier */
// src/topics/dto/create-topic.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';

export class CreateTopicDto {

  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  Description?: string;

  @ApiProperty({ type: [CreateLessonDto] })
  lessons: CreateLessonDto[];

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  // courseId?: string;
}
