import { IsString, IsOptional } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsString()
  courseId: string;

  @IsOptional()
  @IsString()
  lessons?: {
    id: string;
    title?: string;
    content?: string;
    quiz?: any;
  }[];
}
