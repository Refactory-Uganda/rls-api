import { IsString, IsInt } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  duration: number;

  @IsString()
  facilitator: string;
}
