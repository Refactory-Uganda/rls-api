/* eslint-disable prettier/prettier */
// src/note/dto/create-note.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  notesText: string;

  @IsOptional()
  @IsString()
  // @ApiProperty()
  textContentId?: string;
}
