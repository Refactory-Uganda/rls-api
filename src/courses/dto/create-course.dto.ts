/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CourseStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateTopicDto } from "src/topic/dto/create-topic.dto";
<<<<<<< HEAD
// import { CreateLessonDto } from "src/lesson/dto/create-lesson.dto";


// export class CreateTopicDto {

//   @IsString()
//   id: string

=======


// export class CreateTopicDto {
>>>>>>> 79465aca0c4fefcb1d14a7a4dff921d483bf5609
//     @IsString()
//     @IsNotEmpty()
//     @ApiProperty()
//     Title: string;
  
//     @IsString()
//     @IsOptional()
//     @ApiProperty()
<<<<<<< HEAD
//     Description?: string;

//     @ApiProperty({ type: [CreateLessonDto], required: false })
//     @IsOptional()
=======
//     Description: string;

//     @ApiProperty({ type: [CreateLessonDto] })
>>>>>>> 79465aca0c4fefcb1d14a7a4dff921d483bf5609
//     lessons?: CreateLessonDto[]
//   }
  
  export class CreateCourseDto {

<<<<<<< HEAD
    @IsString()
=======
    @IsString() 
>>>>>>> 79465aca0c4fefcb1d14a7a4dff921d483bf5609
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