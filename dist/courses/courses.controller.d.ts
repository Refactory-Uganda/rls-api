import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ImageService } from './images.service';
export declare class CourseController {
    private readonly courseService;
    private readonly imageService;
    constructor(courseService: CourseService, imageService: ImageService);
    uploadImage(file: Express.Multer.File): Promise<string>;
    deleteCourse(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CourseStatus;
        award: string | null;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        courseObjective: string[];
        image: string | null;
        createdAt: Date;
        facilitatorId: string | null;
        quizId: string | null;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto, image?: Express.Multer.File): Promise<{
        quiz: {
            description: string | null;
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string | null;
            courseId: string | null;
        };
        topics: {
            id: string;
            Title: string;
            Description: string | null;
            image: string | null;
            createdAt: Date;
            courseId: string | null;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.CourseStatus;
        award: string | null;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        courseObjective: string[];
        image: string | null;
        createdAt: Date;
        facilitatorId: string | null;
        quizId: string | null;
    }>;
    staffFacilitator(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }[]>;
    getStaffById(staffId: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        Course: {
            Title: string;
            Description: string;
        }[];
    }>;
    findAll(): Promise<{
        courses: ({
            quiz: {
                questions: ({
                    option: {
                        id: string;
                        order: number;
                        optionText: string;
                        isCorrect: boolean;
                        questionId: string | null;
                    }[];
                    userAnswers: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        isCorrect: boolean;
                        questionId: string;
                        quizAttemptId: string;
                        selectedOptionId: string;
                    }[];
                } & {
                    id: string;
                    text: string;
                    createdAt: Date;
                    updatedAt: Date;
                    quizId: string;
                    answer: string;
                    order: number;
                    explanation: string | null;
                })[];
                attempts: {
                    id: string;
                    status: import(".prisma/client").$Enums.AttemptStatus;
                    createdAt: Date;
                    updatedAt: Date;
                    quizId: string;
                    score: number;
                    maxScore: number;
                    startedAt: Date;
                    completedAt: Date | null;
                }[];
            } & {
                description: string | null;
                id: string;
                title: string;
                createdAt: Date;
                updatedAt: Date;
                lessonId: string | null;
                courseId: string | null;
            };
            topics: ({
                Lesson: ({
                    quiz: {
                        questions: ({
                            option: {
                                id: string;
                                order: number;
                                optionText: string;
                                isCorrect: boolean;
                                questionId: string | null;
                            }[];
                            userAnswers: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                isCorrect: boolean;
                                questionId: string;
                                quizAttemptId: string;
                                selectedOptionId: string;
                            }[];
                        } & {
                            id: string;
                            text: string;
                            createdAt: Date;
                            updatedAt: Date;
                            quizId: string;
                            answer: string;
                            order: number;
                            explanation: string | null;
                        })[];
                        attempts: {
                            id: string;
                            status: import(".prisma/client").$Enums.AttemptStatus;
                            createdAt: Date;
                            updatedAt: Date;
                            quizId: string;
                            score: number;
                            maxScore: number;
                            startedAt: Date;
                            completedAt: Date | null;
                        }[];
                    } & {
                        description: string | null;
                        id: string;
                        title: string;
                        createdAt: Date;
                        updatedAt: Date;
                        lessonId: string | null;
                        courseId: string | null;
                    };
                } & {
                    id: string;
                    title: string;
                    text: string | null;
                    topicId: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    quizId: string | null;
                })[];
            } & {
                id: string;
                Title: string;
                Description: string | null;
                image: string | null;
                createdAt: Date;
                courseId: string | null;
            })[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.CourseStatus;
            award: string | null;
            Title: string;
            Description: string | null;
            Duration: string;
            courseOutline: string[];
            requirements: string[];
            assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
            courseObjective: string[];
            image: string | null;
            createdAt: Date;
            facilitatorId: string | null;
            quizId: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        quiz: {
            questions: ({
                option: {
                    id: string;
                    order: number;
                    optionText: string;
                    isCorrect: boolean;
                    questionId: string | null;
                }[];
                userAnswers: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    isCorrect: boolean;
                    questionId: string;
                    quizAttemptId: string;
                    selectedOptionId: string;
                }[];
            } & {
                id: string;
                text: string;
                createdAt: Date;
                updatedAt: Date;
                quizId: string;
                answer: string;
                order: number;
                explanation: string | null;
            })[];
            attempts: {
                id: string;
                status: import(".prisma/client").$Enums.AttemptStatus;
                createdAt: Date;
                updatedAt: Date;
                quizId: string;
                score: number;
                maxScore: number;
                startedAt: Date;
                completedAt: Date | null;
            }[];
        } & {
            description: string | null;
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string | null;
            courseId: string | null;
        };
        topics: ({
            Lesson: ({
                quiz: {
                    questions: ({
                        option: {
                            id: string;
                            order: number;
                            optionText: string;
                            isCorrect: boolean;
                            questionId: string | null;
                        }[];
                        userAnswers: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            isCorrect: boolean;
                            questionId: string;
                            quizAttemptId: string;
                            selectedOptionId: string;
                        }[];
                    } & {
                        id: string;
                        text: string;
                        createdAt: Date;
                        updatedAt: Date;
                        quizId: string;
                        answer: string;
                        order: number;
                        explanation: string | null;
                    })[];
                    attempts: {
                        id: string;
                        status: import(".prisma/client").$Enums.AttemptStatus;
                        createdAt: Date;
                        updatedAt: Date;
                        quizId: string;
                        score: number;
                        maxScore: number;
                        startedAt: Date;
                        completedAt: Date | null;
                    }[];
                } & {
                    description: string | null;
                    id: string;
                    title: string;
                    createdAt: Date;
                    updatedAt: Date;
                    lessonId: string | null;
                    courseId: string | null;
                };
            } & {
                id: string;
                title: string;
                text: string | null;
                topicId: string | null;
                createdAt: Date;
                updatedAt: Date;
                quizId: string | null;
            })[];
        } & {
            id: string;
            Title: string;
            Description: string | null;
            image: string | null;
            createdAt: Date;
            courseId: string | null;
        })[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.CourseStatus;
        award: string | null;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        courseObjective: string[];
        image: string | null;
        createdAt: Date;
        facilitatorId: string | null;
        quizId: string | null;
    }>;
    createCourseP_D(createCourseDto: CreateCourseDto, image?: Express.Multer.File): Promise<{
        courses: {
            facilitator: any;
            id: string;
            status: import(".prisma/client").$Enums.CourseStatus;
            award: string | null;
            Title: string;
            Description: string | null;
            Duration: string;
            courseOutline: string[];
            requirements: string[];
            assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
            courseObjective: string[];
            image: string | null;
            createdAt: Date;
            facilitatorId: string | null;
            quizId: string | null;
        };
    }>;
    publishCourse(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CourseStatus;
        award: string | null;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        courseObjective: string[];
        image: string | null;
        createdAt: Date;
        facilitatorId: string | null;
        quizId: string | null;
    }>;
    draftCourse(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.CourseStatus;
        award: string | null;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        courseObjective: string[];
        image: string | null;
        createdAt: Date;
        facilitatorId: string | null;
        quizId: string | null;
    }>;
}
