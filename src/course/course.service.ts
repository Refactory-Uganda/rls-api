/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    findAll(): string {
        return 'Displaying all courses';
    }


    removeCourse():string{
        return 'Course removed';
    }
}
