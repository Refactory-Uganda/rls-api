import { PrismaService } from '../prisma/prisma.service';
import { Topic } from '@prisma/client';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
export declare class TopicService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTopicDto): Promise<Topic>;
    patchTopic(id: string, partialUpdateDto: UpdateTopicDto): Promise<any>;
    deleteTopic(id: string): any;
    findAllTopicsByCourse(): Promise<any>;
    findOneTopic(id: string): Promise<any>;
}
