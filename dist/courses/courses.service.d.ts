import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ImageService } from './images.service';
export declare class CourseService {
    private prisma;
    private imageService;
    private transformToArray;
    constructor(prisma: PrismaService, imageService: ImageService);
    createCourseDraft(dto: CreateCourseDto): Promise<{
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
    patchCourse(id: string, partialUpdateDto: UpdateCourseDto): Promise<{
        quiz: {
            id: string;
            description: string | null;
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
    findAll(): Promise<{
        courses: ({
            quiz: {
                questions: ({
                    option: {
                        id: string;
                        optionText: string;
                        isCorrect: boolean;
                        order: number;
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
                    order: number;
                    answer: string;
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
                id: string;
                description: string | null;
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
                                optionText: string;
                                isCorrect: boolean;
                                order: number;
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
                            order: number;
                            answer: string;
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
                        id: string;
                        description: string | null;
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
                    optionText: string;
                    isCorrect: boolean;
                    order: number;
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
                order: number;
                answer: string;
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
            id: string;
            description: string | null;
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
                            optionText: string;
                            isCorrect: boolean;
                            order: number;
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
                        order: number;
                        answer: string;
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
                    id: string;
                    description: string | null;
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
}
