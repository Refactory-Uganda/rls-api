/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}
  updateCourse(): string {
    return 'Course updated';
  }
  findAll(): string {
    return 'Displaying all courses';
  }

  removeCourse(): string {
    return 'Course removed';
  }
}
