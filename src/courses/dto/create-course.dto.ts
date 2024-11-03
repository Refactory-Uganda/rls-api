/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CourseStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateLessonDto } from "src/lesson/dto/create-lesson.dto";


export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
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
    Description: string;

    @ApiProperty({ type: [CreateLessonDto],
      description: 'The lessons of the topic',
      example: 'Lesson 1: DataTypes'
    })
    lessons?: CreateLessonDto[]
  }
  
  export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description: 'The title of the course',
      example: 'Introduction to Programming',
    })
    Title: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty({
      description: 'The description of the course',
      example: 'This course is an introduction to programming'
    })
    Description: string;
  
    @IsString()
    @ApiProperty({
      description: 'The duration of the course',
      example: '6 weeks'
    })
    Duration: string;

    @IsEnum(CourseStatus)
    @ApiProperty({
      description: 'The status of the course',
      example: 'DRAFT | PUBLISHED | DELETED'
    })
    status?: CourseStatus

    @ApiProperty({ type: [CreateTopicDto] ,
      description: 'The topics of the course',
      example: 'Introduction to Programming | Introduction to JavaScript'
    })
    topics: CreateTopicDto[];
  }