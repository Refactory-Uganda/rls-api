/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  Title?: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsString()
  Duration?: string;
}
