import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from '../lesson/dto/update-lesson.dto';
export declare class LessonController {
    private lessonService;
    constructor(lessonService: LessonService);
    createLesson(topic_id: string, createLessonDto: CreateLessonDto): Promise<any>;
    patch(id: string, partialUpdateDto: UpdateLessonDto): Promise<any>;
    deleteLesson(lesson_id: string): Promise<any>;
    findAllLessons(): Promise<any>;
    findLessonById(lessonId: string): Promise<any>;
}
