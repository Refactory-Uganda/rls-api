/* eslint-disable prettier/prettier */
// src/sub-heading/sub-heading.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';

@Injectable()
export class SubHeadingService {
  constructor(private prisma: PrismaService) {}

  async create(createSubHeadingDto: CreateSubHeadingDto) {
    const { subText, textContentId } = createSubHeadingDto;

    const subHeading = await this.prisma.subHeading.create({
      data: {
        subText,
        textContentId,
      },
    }); 

    return subHeading;
  }

  async updateSubheading(id: string, updateSubheadingDto: UpdateSubheadingDto) {
    try {
      const updateData = {
        subText: updateSubheadingDto.subText,
      textContentId: updateSubheadingDto.textContentId,
      };
      return await this.prisma.subHeading.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(`Error updating subheading with ID ${id}: ${error.message}`);
    }
  }

  async patchSubheading(id: string, partialUpdateDto: UpdateSubheadingDto) {
    try {
      const updateData = {
        subText: partialUpdateDto.subText,
        textContentId: partialUpdateDto.textContentId,
      };
      return await this.prisma.subHeading.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(
        `Error partially updating subheading with ID ${id}: ${error.message}`,
      );
    }
  }


  async remove(id: string) {
    return this.prisma.subHeading.delete({
      where: { id },
    });
  }
}
