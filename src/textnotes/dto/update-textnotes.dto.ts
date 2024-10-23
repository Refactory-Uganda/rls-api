/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class UpdateTextnotesDto {
  @IsOptional()
  @IsString()
  notesText?: string;

//   @IsOptional()
//   @IsString()
//   textContentId?: string;

  @IsOptional()
  textContent?: any;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}