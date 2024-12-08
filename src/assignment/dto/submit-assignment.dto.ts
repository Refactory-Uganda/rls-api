// submit-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class SubmitAssignmentDto {

  @ApiProperty()
  @IsString()
  assignmentId: string;

  @ApiProperty()
  @IsString()
  answerUpload: string; // File path of the uploaded answer

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty()
  submittedDate: Date;

  @ApiProperty()
  grade: number;

  @ApiProperty()
  status: SubmissionStatus;
}
export class GradeSubmissionDto {
  @ApiProperty({
    description: 'The grade for the submission',
    type: Number,
  })
  grade: number;
}