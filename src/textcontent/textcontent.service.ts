import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';

@Injectable()
export class TextContentService {
  constructor(private prisma: PrismaService) {}

  async create(createTextContentDto: CreateTextContentDto) {
    const { heading, lessonId, notes, subHeadings } = createTextContentDto;

    const textContent = await this.prisma.textContent.create({
      data: {
        heading,
        lessonId,
        // notes: {
        //   create: notes.map(note => ({ content: note.content })), 
        // },
        // subHeadings: {
        //   create: subHeadings.map(subHeading => ({ title: subHeading.title })), 
        // },
      },
      include: {
        notes: true,
        subHeadings: true,
        lesson: true,
      },
    });

    return {
      id: textContent.id,
      heading: textContent.heading,
      subHeadings: textContent.subHeadings,
      notes: textContent.notes,
      lessonId: textContent.lessonId,
      createdAt: textContent.createdAt,
      updatedAt: textContent.updatedAt,
    };
  }
}
