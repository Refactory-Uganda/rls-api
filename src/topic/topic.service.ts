/* eslint-disable prettier/prettier */
// src/topics/topics.service.ts
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Topic } from '@prisma/client';
// import { CreateTopicDto } from './dto/create-topic.dto'; // adjust path as needed
import { UpdateTopicDto } from './dto/update-topic.dto';
// import { Prisma } from '@prisma/client';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTopicDto): Promise<Topic> {
    const imageUrl = data.image ? `/uploads/topics/${data.image}` : null;

    return this.prisma.topic.create({
      data: {
        Title: data.Title,
        Description: data.Description,
        image: imageUrl,
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

  async patchTopic(id: string, partialUpdateDto: UpdateTopicDto) {
    try {

      const sanitizedId = id.trim();
    if (!/^[a-fA-F0-9]{24}$/.test(sanitizedId)) {
        throw new Error(`Invalid topic ID format: ${sanitizedId}`);
    }

      const imageUrl = partialUpdateDto.image ? `/uploads/courses/${partialUpdateDto.image}` : null

      console.log('Updating topic with ID:', sanitizedId);
    console.log('Image URL:', imageUrl);
    console.log('Partial update data:', partialUpdateDto);
  
      return await this.prisma.topic.update({
        where: { id: sanitizedId },
        data: {
          Title: partialUpdateDto.Title,
          Description: partialUpdateDto.Description,
          image: imageUrl,
          courseId: partialUpdateDto.courseId
        },
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
