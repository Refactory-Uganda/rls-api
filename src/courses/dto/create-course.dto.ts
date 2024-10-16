/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
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