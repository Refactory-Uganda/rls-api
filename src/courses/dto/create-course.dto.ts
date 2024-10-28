/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CourseStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Title: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    Description: string;
  }
  
  export class CreateCourseDto {
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
    page: number;
    limit: number;

    // @IsOptional()
    // @IsNumber()
    // @ApiProperty({ description: "Page number for pagination", example: 1 })
    // page?: number;

    // @IsOptional()
    // @IsNumber()
    // @ApiProperty({ description: "Number of items per page", example: 6 })
    // limit?: number;

  }