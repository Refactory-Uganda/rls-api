// src/sub-heading/dto/create-sub-heading.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubHeadingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subText: string; 

  @IsOptional()
  @IsString()
  @ApiProperty()
  textContentId?: string; 
}
