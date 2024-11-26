/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { CreateOptionDto } from '../../option/dto/option.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  answer: string;

  @IsNumber()
  @ApiProperty()
  order: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  explanation?: string;

  @IsString()
  @ApiProperty()
  quizId: string;
  id: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [CreateOptionDto] })
  option?: CreateOptionDto[];
}
