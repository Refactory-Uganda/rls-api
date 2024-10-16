// src/course/dto/create-course.dto.ts
export class CreateCourseDto {
    courseTitle: string; // Required
    courseDescription?: string; // Optional
    courseDuration: string; // Required
    modules?: string[]; // Assuming modules are an array of module titles or IDs (depends on your use case)
  }
  