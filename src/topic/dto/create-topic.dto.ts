// src/topics/dto/create-topic.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  Description?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  courseId: string;
}
