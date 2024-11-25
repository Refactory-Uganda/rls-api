/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  optionText: string;

  @IsBoolean()
  @ApiProperty()
  iscorrect: boolean;

  @IsNumber()
  @ApiProperty()
  order: number;

  @IsString()
  @ApiProperty()
  questionId: string;
  id: any;
}

export class UpdateOptionDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  optionText?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  iscorrect?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  order?: number;
}
