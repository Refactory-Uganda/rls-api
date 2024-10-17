// src/topics/topics.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Topic } from '@prisma/client';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { Title: string; Description?: string; courseId: string }): Promise<Topic> {
    // Ensure the data object contains the necessary fields
    return this.prisma.topic.create({
      data: {
        Title: data.Title, 
        Description: data.Description, 
        courseId: data.courseId, 
      },
    });
  }
}
