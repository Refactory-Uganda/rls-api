// src/topics/topics.module.ts
import { Module } from '@nestjs/common';
import { TopicsController } from './topic.controller';
import { TopicsService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service'; 

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, PrismaService],
})
export class TopicsModule {}
