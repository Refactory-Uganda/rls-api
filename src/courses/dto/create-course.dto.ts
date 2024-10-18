/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Topic } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


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
  
    @ApiProperty({ type: [CreateTopicDto] })
    topics: CreateTopicDto[];
  }