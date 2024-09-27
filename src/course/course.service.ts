/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    updateCourse(): string {
        return 'Course updated';
    }
    findAll(): string {
        return 'Displaying all courses';
    }


    removeCourse():string{
        return 'Course removed';
    }
}

