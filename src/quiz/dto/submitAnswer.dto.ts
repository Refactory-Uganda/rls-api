/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SubmitAnswerDto {
  // @ApiProperty()
  // @IsString()
  // id: string;

  @ApiProperty()
  @IsString()
  attemptId: string;

  @ApiProperty()
  @IsString()
  questionId: string;

  @ApiProperty()
  @IsString()
  optionId: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}
