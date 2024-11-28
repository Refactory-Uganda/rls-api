// src/course/course.controller.ts
import { Controller, Post, Body,  HttpCode, HttpStatus } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {}
