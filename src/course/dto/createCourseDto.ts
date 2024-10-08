/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContentDto {
  type: 'TEXT'| 'VIDEO' | 'LINK';
  data: string;
}

export class CreateModuleDto {
  @ApiProperty()
  @IsString()
  moduleTitle: string;

  @ApiProperty()
  @IsString()
  moduleDescription?: string;


  facilitator?:{
    name: string;
    email: string;
  };
  contents: CreateContentDto[];
}

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  courseTitle: string;

  @ApiProperty()
  @IsString()
  courseDescription?: string;

  @ApiProperty()
  @IsString()
  courseDuration: string;
  modules: CreateModuleDto[];
}
