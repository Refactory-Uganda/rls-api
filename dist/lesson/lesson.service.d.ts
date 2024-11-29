import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class LessonService {
    private prisma;
    constructor(prisma: PrismaService);
    createNew(createLessonDto: CreateLessonDto): Promise<{
        topic: {
            id: string;
            Title: string;
            Description: string | null;
            image: string | null;
            createdAt: Date;
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
    }>;
    patchLesson(id: string, partialUpdateDto: UpdateLessonDto): Promise<{
        topic: {
            id: string;
            Title: string;
            Description: string | null;
            image: string | null;
            createdAt: Date;
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
    }>;
    deleteLesson(id: string): Promise<{
        id: string;
        title: string;
        text: string | null;
        topicId: string | null;
        createdAt: Date;
        updatedAt: Date;
        quizId: string | null;
    }>;
    findAllLessons(): Promise<({
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
    })[]>;
    findLessonById(lessonId: string): Promise<{
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
    }>;
}
