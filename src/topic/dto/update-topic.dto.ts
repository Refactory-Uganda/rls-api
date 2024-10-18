import { IsString, IsOptional } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsString()
  courseId: string;
}
