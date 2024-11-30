// create-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  instructions: string[];

  @ApiProperty()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString(), { toClassOnly: true })  // Convert date to ISO 8601 format
  dueDate: string;

  @ApiProperty()
  @IsArray()
  question: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  uploadQuestion?: string; // Optional file upload link (could be the file URL or path)

  @ApiProperty({ type: [String] })
  @IsArray()
  lessonIds: string[]; // IDs of lessons to which the assignment is related
}
