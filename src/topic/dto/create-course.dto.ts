/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    Title: string;

    @IsString()
    @IsOptional()
    Description?: string;

    @IsString()
    @IsNotEmpty()
    CourseId: string;

}