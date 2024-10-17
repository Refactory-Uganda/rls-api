/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


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

}