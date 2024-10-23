/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateTextContentDto {
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  heading?: string;

  @IsOptional()
  @IsArray()
  notes?: string[];

  @IsOptional()
  @IsArray()
  subHeadings?: string[];

  @IsOptional()
  @IsString()
  lessonId?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
