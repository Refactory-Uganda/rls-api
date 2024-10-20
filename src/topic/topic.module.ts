/* eslint-disable prettier/prettier */
// src/topics/topics.module.ts
import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service'; 

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService],
})
export class TopicsModule {}
