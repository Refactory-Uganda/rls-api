/* eslint-disable prettier/prettier */
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SubmitAnswerDto } from './submitAnswer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SubmitQuizDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  quizId: string;

  // @IsString()
  attemptId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  @ApiProperty({
    type: [SubmitAnswerDto],
    description: 'The topics of the course',
  })
  @ArrayNotEmpty()
  answers: SubmitAnswerDto[];
}
