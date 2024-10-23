/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTextContentDto {
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  heading?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  notes?: { content: string }[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  subHeadings?: { title: string }[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  lessonId?: string;

  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;
}
