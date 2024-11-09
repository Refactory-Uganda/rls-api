/* eslint-disable prettier/prettier */
// src/topics/dto/create-topic.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';

export class CreateTopicDto {

  @IsString()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The title of the topic',
    example: 'Introduction to JavaScript',
  })
  Title: string;

  
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the topic',
    example: 'This topic is an introduction to JavaScript'
  })
  Description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string

  @ApiProperty()
  @IsString()
  courseId: string

  // @ApiProperty({
  //   type: [CreateLessonDto],
  //   description: 'The lessons of the topic',
  //   example: '[Lesson 1: DataTypes]'
  // })
  lessons: CreateLessonDto[]

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  // courseId?: string;
}
