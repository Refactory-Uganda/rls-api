/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    Description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    CourseId: string;

}