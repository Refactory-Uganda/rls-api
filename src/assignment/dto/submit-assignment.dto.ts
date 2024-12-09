// submit-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SubmitAssignmentDto {

  @ApiProperty()
  @IsString()
  assignmentId: string;

  @ApiProperty({type: 'string', format: 'binary', required: false})
  @IsOptional()
  @IsString()
  answerUpload?: Express.Multer.File; // File path of the uploaded answer


  

  // @ApiProperty({ enum:SubmissionStatus })
  // status: SubmissionStatus;
}
export class GradeSubmissionDto {
  @ApiProperty({
    description: 'The grade for the submission',
    type: Number,
  })
  @IsNumber()
  grade: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;

  // @ApiProperty({ enum:SubmissionStatus })
  @IsOptional()
  status?: SubmissionStatus;

}