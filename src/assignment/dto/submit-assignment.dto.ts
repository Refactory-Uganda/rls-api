// submit-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubmitAssignmentDto {
  @ApiProperty()
  @IsString()
  answerUpload: string; // File path of the uploaded answer
}
