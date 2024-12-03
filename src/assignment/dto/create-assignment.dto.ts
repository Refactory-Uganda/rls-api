// create-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

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
  dueDate: Date;

  @ApiProperty()
  @IsInt()
  points? : number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  uploadQuestion?: string; // Optional file upload link (could be the file URL or path)

  @ApiProperty()
  @IsString()
  lessonIds: string; // IDs of lessons to which the assignment is related

  @IsOptional()
  file?: any;
}
