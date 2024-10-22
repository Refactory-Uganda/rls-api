/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';

@Injectable()
export class TextContentService {
  constructor(private prisma: PrismaService) {}
  async createNew(dto: CreateTextContentDto) {
    const text = await this.prisma.textContent.create({
      data: {
        heading: dto.heading,
        lessonId: dto.lessonId,
        
      }
    });
    return text;
  }

async delete( id: string) {
  const text = await this.prisma.textContent.delete({
    where: 
    {
      id: id,
    }
  });
  return text;
}


}