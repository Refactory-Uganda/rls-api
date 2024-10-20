/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    topicId: string; // Reference to the Topic ID
}
