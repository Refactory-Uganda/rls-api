import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { CreateOptionDto } from '../../option/dto/option.dto';  // Add this import
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

  @IsArray()
  @IsOptional()
  @ApiProperty()
  options?: CreateOptionDto[];

  @IsString()
  @ApiProperty()
  quizId: string;
}

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  text?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  answer?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  order?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  explanation?: string;
}
