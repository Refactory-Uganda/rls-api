import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    findAll(): string {
        return 'Displaying all courses';
    }
}

