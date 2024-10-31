/* eslint-disable prettier/prettier */
import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateQuestionDto } from "src/question/dto/create-question.dto";  // Add this import
import { ApiProperty } from '@nestjs/swagger';


export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  lessonId: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({type:[CreateQuestionDto]})
  questions?: CreateQuestionDto[];


}
