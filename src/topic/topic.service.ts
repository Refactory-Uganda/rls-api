/* eslint-disable prettier/prettier */
// src/topics/topics.service.ts
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Topic } from '@prisma/client';
// import { CreateTopicDto } from './dto/create-topic.dto'; // adjust path as needed
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    Title: string;
    Description?: string;
    courseId: string;
  }): Promise<Topic> {
    return this.prisma.topic.create({
      data: {
        Title: data.Title,
        Description: data.Description,
        courseId: data.courseId,
      },
      include: { 
        Course: true,
        Lesson: true

      },
    });
  }

  // async createNew(dto: CreateTopicDto): Promise<Topic> {
  //   return await this.prisma.topic.create({
  //     data: {
  //       Title: dto.Title,
  //       Description: dto.Description,

  //     },
  //   });
  // }

  // async updateTopic(id: string, updateTopicDto: UpdateTopicDto) {
  //   try {
  //     return await this.prisma.topic.update({
  //       where: { id },
  //       data: {
  //         Title: updateTopicDto.Title,
  //         Description: updateTopicDto.Description,
  //       },
  //     });
  //   } catch (error) {
  //     throw new Error(`Error updating topic with ID ${id}: ${error.message}`);
  //   }
  // }

  async patchTopic(id: string, partialUpdateDto: Partial<UpdateTopicDto>) {
    try {
      const updateData: Prisma.TopicUpdateInput = {
        Title: { set: partialUpdateDto.Title },
        Description: { set: partialUpdateDto.Description },
      };
  
      return await this.prisma.topic.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(`Error partially updating topic with ID ${id}: ${error.message}`);
    }
  }
  
  

  deleteTopic(id: string) {
    return this.prisma.topic.delete({
      where: {
        id: id,
      },
      include: { Course: true },
    });
  }

  async findAllTopicsByCourse() {
    return this.prisma.topic.findMany({
      include: { Lesson: true },
    });
  }
  async findOneTopic(id: string) {
    return this.prisma.topic.findUnique({
      where: { id },
      include: { Lesson: true },
    });
  }
}
