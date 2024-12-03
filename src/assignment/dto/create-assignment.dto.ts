// create-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  instructions?: string[];

  @ApiProperty()
  @IsDateString()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Max(100)
  @IsInt()
  points? : number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  uploadQuestion?: Express.Multer.File; // Optional file upload link (could be the file URL or path)

  @ApiProperty()
  @IsString()
  lessonIds: string; // IDs of lessons to which the assignment is related

}
