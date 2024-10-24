import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';  // Add this import
import { ApiProperty } from '@nestjs/swagger';


export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @IsOptional()
  // @ApiProperty()
  questions?: CreateQuestionDto[];

  @IsString()
  @ApiProperty()
  lessonId: string;
}
