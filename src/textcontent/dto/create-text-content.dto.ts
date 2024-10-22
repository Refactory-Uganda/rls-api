/* eslint-disable prettier/prettier */
// src/text-content/dto/create-text-content.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTextContentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  heading: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lessonId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  notes?: { content: string }[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  subHeadings?: { title: string }[];
}
