/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';

@Injectable()
export class TextContentService {
  constructor(private prisma: PrismaService) {}
  async createNew(dto: CreateTextContentDto) {
    const text = await this.prisma.textContent.create({
      data: {
        heading: dto.heading,
        lessonId: dto.lessonId,
      },
    });
    return text;
  }

  async updateTextContent(
    id: string,
    updateTextContentDto: UpdateTextContentDto,
  ) {
    try {
      const updateData = {
        heading: updateTextContentDto.heading,
        lessonId: updateTextContentDto.lessonId,
      };
      return await this.prisma.textContent.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(
        `Error updating textcontent with ID ${id}: ${error.message}`,
      );
    }
  }

  async patchTextContent(id: string, partialUpdateDto: UpdateTextContentDto) {
    try {
      const updateData = {
        heading: partialUpdateDto.heading,
        lessonId: partialUpdateDto.lessonId,
      };
      return await this.prisma.textContent.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(
        `Error partially updating textcontent with ID ${id}: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    const text = await this.prisma.textContent.delete({
      where: {
        id: id,
      },
    });
    return text;
  }
}
