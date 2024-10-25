/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  Title?: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsOptional()
  @IsString()
  Duration?: string;

  @IsOptional()
  @IsArray()
  topics?: {
    lessons: any;
    id: string;
    Title?: string;
    Description?: string;
  }[];
}
