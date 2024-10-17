/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TopicService {
    constructor(private prisma: PrismaService) {}

    deleteTopic(id: string) {
        return this.prisma.topic.delete({
            where: {
                id: id,
            },
            include: {Course: true}
        });
    }
}
