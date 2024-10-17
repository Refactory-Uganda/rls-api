/* eslint-disable prettier/prettier */
// src/topic/topic.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      return await this.prisma.topic.update({
        where: { id },
        data: updateTopicDto,
      });
    } catch (error) {
      throw new Error(`Error updating topic with ID ${id}: ${error.message}`);
    }
  }

  async patchTopic(id: string, partialUpdateDto: Partial<UpdateTopicDto>) {
    try {
      return await this.prisma.topic.update({
        where: { id },
        data: partialUpdateDto,
      });
    } catch (error) {
      throw new Error(`Error partially updating topic with ID ${id}: ${error.message}`);
    }
  }
}
