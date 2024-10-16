/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    Title: string;

    @IsString()
    @IsOptional()
    Description: string;

    @IsString()
    Duration: string;
}