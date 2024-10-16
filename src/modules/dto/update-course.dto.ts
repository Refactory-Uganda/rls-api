/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';
import { Module } from '../entities/module.entity';

export class UpdateCourseDto {
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  modules?: Module[];

  @IsString()
  duration?: string;
}
