/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Content } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async uploadContent(moduleId: string, name: string, fileUrl: string): Promise<Content> {
    return this.prisma.content.create({
      data: {
        name,
        fileUrl,
        module: {connect:{ id: moduleId }}
      },
    });
  }

  async findAll(moduleId: string): Promise<Content[]> {
    return this.prisma.content.findMany({
      where: {
        module: { id: moduleId },
      },
    });
  }
}
