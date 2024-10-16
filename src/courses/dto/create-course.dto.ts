/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    Title: string;

    @IsString()
    Description: string;

    @IsString()
    Duration: string;
}