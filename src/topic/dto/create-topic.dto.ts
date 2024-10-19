// src/topics/dto/create-topic.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}
