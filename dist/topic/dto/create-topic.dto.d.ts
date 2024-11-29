import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';
export declare class CreateTopicDto {
    id?: string;
    Title: string;
    Description?: string;
    image?: string;
    courseId: string;
    lessons: CreateLessonDto[];
}
