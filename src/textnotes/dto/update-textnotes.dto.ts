/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTextnotesDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  notesText?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  textContentId?: string;

  @IsOptional()
  textContent?: any;

  @IsOptional()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;
}