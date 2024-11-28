import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ImageService } from './images.service';
import { FacilitatorService } from './faculitator.service';
export declare class CourseController {
    private readonly courseService;
    private readonly imageService;
    private readonly facilitatorService;
    constructor(courseService: CourseService, imageService: ImageService, facilitatorService: FacilitatorService);
    uploadImage(file: Express.Multer.File): Promise<string>;
    getStaffFromRims(): Promise<{
        message: string;
    }>;
    deleteCourse(id: string): Promise<{
        id: string;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        facilitatorId: string | null;
        award: string | null;
        courseObjective: string[];
        status: import(".prisma/client").$Enums.CourseStatus;
        createdAt: Date;
        quizId: string | null;
        image: string | null;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto, image?: Express.Multer.File): Promise<{
        topics: {
            id: string;
            Title: string;
            Description: string | null;
            createdAt: Date;
            image: string | null;
            courseId: string | null;
        }[];
        quiz: {
            id: string;
            createdAt: Date;
            title: string;
            description: string | null;
            updatedAt: Date;
            lessonId: string | null;
            courseId: string | null;
        };
    } & {
        id: string;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        facilitatorId: string | null;
        award: string | null;
        courseObjective: string[];
        status: import(".prisma/client").$Enums.CourseStatus;
        createdAt: Date;
        quizId: string | null;
        image: string | null;
    }>;
    staffFacilitator(): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }[]>;
    getStaffById(staffId: string): Promise<{
        id: string;
        Course: {
            Title: string;
            Description: string;
        }[];
        email: string;
        firstName: string;
        lastName: string;
    }>;
    findAll(): Promise<{
        courses: ({
            facilitator: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                externalId: string;
                email: string;
                firstName: string;
                lastName: string;
                userGroup: import(".prisma/client").$Enums.Groups;
                nationality: string | null;
                residence: string | null;
                refresh_token: string | null;
            };
            topics: ({
                Lesson: ({
                    quiz: {
                        questions: ({
                            option: {
                                id: string;
                                order: number;
                                optionText: string;
                                isCorrect: boolean | null;
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
                            createdAt: Date;
                            quizId: string;
                            updatedAt: Date;
                            text: string;
                            answer: string;
                            order: number;
                            explanation: string | null;
                        })[];
                        attempts: {
                            id: string;
                            status: import(".prisma/client").$Enums.AttemptStatus;
                            createdAt: Date;
                            quizId: string;
                            updatedAt: Date;
                            score: number;
                            maxScore: number;
                            startedAt: Date;
                            completedAt: Date | null;
                        }[];
                    } & {
                        id: string;
                        createdAt: Date;
                        title: string;
                        description: string | null;
                        updatedAt: Date;
                        lessonId: string | null;
                        courseId: string | null;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    quizId: string | null;
                    title: string;
                    updatedAt: Date;
                    text: string | null;
                    topicId: string | null;
                })[];
            } & {
                id: string;
                Title: string;
                Description: string | null;
                createdAt: Date;
                image: string | null;
                courseId: string | null;
            })[];
            quiz: {
                questions: ({
                    option: {
                        id: string;
                        order: number;
                        optionText: string;
                        isCorrect: boolean | null;
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
                    createdAt: Date;
                    quizId: string;
                    updatedAt: Date;
                    text: string;
                    answer: string;
                    order: number;
                    explanation: string | null;
                })[];
                attempts: {
                    id: string;
                    status: import(".prisma/client").$Enums.AttemptStatus;
                    createdAt: Date;
                    quizId: string;
                    updatedAt: Date;
                    score: number;
                    maxScore: number;
                    startedAt: Date;
                    completedAt: Date | null;
                }[];
            } & {
                id: string;
                createdAt: Date;
                title: string;
                description: string | null;
                updatedAt: Date;
                lessonId: string | null;
                courseId: string | null;
            };
        } & {
            id: string;
            Title: string;
            Description: string | null;
            Duration: string;
            courseOutline: string[];
            requirements: string[];
            assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
            facilitatorId: string | null;
            award: string | null;
            courseObjective: string[];
            status: import(".prisma/client").$Enums.CourseStatus;
            createdAt: Date;
            quizId: string | null;
            image: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        topics: ({
            Lesson: ({
                quiz: {
                    questions: ({
                        option: {
                            id: string;
                            order: number;
                            optionText: string;
                            isCorrect: boolean | null;
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
                        createdAt: Date;
                        quizId: string;
                        updatedAt: Date;
                        text: string;
                        answer: string;
                        order: number;
                        explanation: string | null;
                    })[];
                    attempts: {
                        id: string;
                        status: import(".prisma/client").$Enums.AttemptStatus;
                        createdAt: Date;
                        quizId: string;
                        updatedAt: Date;
                        score: number;
                        maxScore: number;
                        startedAt: Date;
                        completedAt: Date | null;
                    }[];
                } & {
                    id: string;
                    createdAt: Date;
                    title: string;
                    description: string | null;
                    updatedAt: Date;
                    lessonId: string | null;
                    courseId: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                quizId: string | null;
                title: string;
                updatedAt: Date;
                text: string | null;
                topicId: string | null;
            })[];
        } & {
            id: string;
            Title: string;
            Description: string | null;
            createdAt: Date;
            image: string | null;
            courseId: string | null;
        })[];
        quiz: {
            questions: ({
                option: {
                    id: string;
                    order: number;
                    optionText: string;
                    isCorrect: boolean | null;
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
                createdAt: Date;
                quizId: string;
                updatedAt: Date;
                text: string;
                answer: string;
                order: number;
                explanation: string | null;
            })[];
            attempts: {
                id: string;
                status: import(".prisma/client").$Enums.AttemptStatus;
                createdAt: Date;
                quizId: string;
                updatedAt: Date;
                score: number;
                maxScore: number;
                startedAt: Date;
                completedAt: Date | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            title: string;
            description: string | null;
            updatedAt: Date;
            lessonId: string | null;
            courseId: string | null;
        };
    } & {
        id: string;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        facilitatorId: string | null;
        award: string | null;
        courseObjective: string[];
        status: import(".prisma/client").$Enums.CourseStatus;
        createdAt: Date;
        quizId: string | null;
        image: string | null;
    }>;
    createCourseP_D(createCourseDto: CreateCourseDto, image?: Express.Multer.File): Promise<{
        courses: {
            facilitator: any;
            id: string;
            Title: string;
            Description: string | null;
            Duration: string;
            courseOutline: string[];
            requirements: string[];
            assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
            facilitatorId: string | null;
            award: string | null;
            courseObjective: string[];
            status: import(".prisma/client").$Enums.CourseStatus;
            createdAt: Date;
            quizId: string | null;
            image: string | null;
        };
    }>;
    publishCourse(id: string): Promise<{
        id: string;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        facilitatorId: string | null;
        award: string | null;
        courseObjective: string[];
        status: import(".prisma/client").$Enums.CourseStatus;
        createdAt: Date;
        quizId: string | null;
        image: string | null;
    }>;
    draftCourse(id: string): Promise<{
        id: string;
        Title: string;
        Description: string | null;
        Duration: string;
        courseOutline: string[];
        requirements: string[];
        assessmentMode: import(".prisma/client").$Enums.AssessmentMode | null;
        facilitatorId: string | null;
        award: string | null;
        courseObjective: string[];
        status: import(".prisma/client").$Enums.CourseStatus;
        createdAt: Date;
        quizId: string | null;
        image: string | null;
    }>;
}
