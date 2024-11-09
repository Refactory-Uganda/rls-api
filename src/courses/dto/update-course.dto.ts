/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsArray, ValidateNested, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CourseStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
// import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';

export class UpdateLessonDto {

    @IsString()
    @IsOptional()
    @ApiProperty()
    id?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    title?: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    text?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    topicId?: string;
}

export class UpdateTopicDto {
    // @IsString()
    // @ApiProperty()
    // id: string; // This is important! We need the topic ID for updates

    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // Title?: string;

    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // Description?: string;

    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // courseId?: string;

    // @ValidateNested({ each: true })
    // @Type(() => UpdateLessonDto)
    // @IsOptional()
    // @ApiProperty()
    // Lesson?: UpdateLessonDto;



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

    @ApiProperty({ type: [UpdateLessonDto] })
    lessons: UpdateLessonDto[];
}

export class UpdateCourseDto {

    @IsString()
    @IsOptional()
    @ApiProperty()
    id?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    Title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    Description?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    Duration?: string;

    @IsEnum(CourseStatus)
    @ApiProperty()
    status?: CourseStatus

    @ApiProperty()
    // @IsString()
    image: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateTopicDto)
    @IsOptional()
    @ApiProperty()
    topics?: UpdateTopicDto[];
}
