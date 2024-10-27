/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CourseStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateTopicDto } from "src/topic/dto/create-topic.dto";


// export class CreateTopicDto {
//     @IsString()
//     @IsNotEmpty()
//     @ApiProperty()
//     Title: string;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
//     Description: string;

//     @ApiProperty({ type: [CreateLessonDto] })
//     lessons?: CreateLessonDto[]
//   }
  
  export class CreateCourseDto {

    @IsString() 
    id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Title: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    Description: string;
  
    @IsString()
    @ApiProperty()
    Duration: string;

    @IsEnum(CourseStatus)
    @ApiProperty()
    status?: CourseStatus

    @ApiProperty({ type: [CreateTopicDto] })
    topics: CreateTopicDto[];
  }