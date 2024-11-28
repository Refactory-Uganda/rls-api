import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
export declare class TopicController {
    private readonly topicService;
    constructor(topicService: TopicService);
    create(course_id: string, image: Express.Multer.File, body: CreateTopicDto): Promise<{
        id: string;
        Title: string;
        Description: string | null;
        image: string | null;
        createdAt: Date;
        courseId: string | null;
    }>;
    patch(id: string, partialUpdateDto: UpdateTopicDto, image?: Express.Multer.File): Promise<{
        id: string;
        Title: string;
        Description: string | null;
        image: string | null;
        createdAt: Date;
        courseId: string | null;
    }>;
    deleteTopic(id: string): import(".prisma/client").Prisma.Prisma__TopicClient<{
        Course: {
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
    } & {
        id: string;
        Title: string;
        Description: string | null;
        image: string | null;
        createdAt: Date;
        courseId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllTopics(): Promise<({
        Lesson: {
            id: string;
            title: string;
            text: string | null;
            topicId: string | null;
            createdAt: Date;
            updatedAt: Date;
            quizId: string | null;
        }[];
    } & {
        id: string;
        Title: string;
        Description: string | null;
        image: string | null;
        createdAt: Date;
        courseId: string | null;
    })[]>;
    findOneTopic(id: string): Promise<{
        Lesson: {
            id: string;
            title: string;
            text: string | null;
            topicId: string | null;
            createdAt: Date;
            updatedAt: Date;
            quizId: string | null;
        }[];
    } & {
        id: string;
        Title: string;
        Description: string | null;
        image: string | null;
        createdAt: Date;
        courseId: string | null;
    }>;
}
