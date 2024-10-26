/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreateCourseDto } from "./create-course.dto";
// import { CreateLessonDto } from "src/lesson/dto/create-lesson.dto";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
// export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
// export class UpdateLessonDto extends PartialType (CreateLessonDto) {}