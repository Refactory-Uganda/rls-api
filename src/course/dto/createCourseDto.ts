/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateContentDto {
  type: 'TEXT'| 'VIDEO' | 'LINK';
  data: string;
}

export class CreateModuleDto {
  @IsString()
  moduleTitle: string;
  moduleDescription?: string;
  facilitator?:{
    name: string;
    email: string;
  };
  contents: CreateContentDto[];
}

export class CreateCourseDto {
  @IsString()
  courseTitle: string;
  courseDescription?: string;
  courseDuration: string;
  modules: CreateModuleDto[];
}
