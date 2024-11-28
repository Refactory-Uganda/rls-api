import { AssessmentMode, Course } from '@prisma/client'; 
import { CourseStatus } from '@prisma/client';

export const mockCourseResponse: Course = {
    id: '60c72b2f9b1d4e3a4c8b4567',
    Title: 'Introduction to Programming',
    Description: 'A beginner-friendly course on programming basics.',
    Duration: '10 hours',
    status: CourseStatus.DRAFT,
    createdAt: new Date(),
    courseOutline: ['gbhbtth', 'byutbg'],
    requirements: ['tjntjh', 'rhnjh'],
    assessmentMode: AssessmentMode.QUIZ,
    facilitatorId: '60c72b2f9b1d4e3a4c8b4567',
    quizId: 'some-quiz-id',
    award: '',
    courseObjective: [],
    image: ''
};

export const mockCreateCourseDto = {
    Title: 'Introduction to Programming',
    Description: 'A beginner-friendly course on programming basics.',
    Duration: '10 hours',
};

export const mockUpdateCourseDto = {
    Title: 'Advanced Programming',
    Description: 'An advanced course on programming concepts.',
    Duration: '20 hours',
};
