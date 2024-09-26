/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {

    removeCourse():string{
        return 'Course removed';
    }
}
