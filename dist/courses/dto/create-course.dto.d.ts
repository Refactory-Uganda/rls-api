import { CourseStatus } from "@prisma/client";
import { AssessmentMode } from "@prisma/client";
import { CreateLessonDto } from "src/lesson/dto/create-lesson.dto";
export declare class CreateTopicDto {
    Title: string;
    Description: string;
    lessons?: CreateLessonDto[];
}
export declare class CreateCourseDto {
    id?: string;
    Title: string;
    Description: string;
    Duration: string;
    courseOutline?: string[];
    requirements?: string[];
    assessmentMode?: AssessmentMode;
    facilitator?: string;
    status?: CourseStatus;
    topics: CreateTopicDto[];
    award?: string;
    courseObjective?: string[];
    image?: string;
    quiz: any;
}
