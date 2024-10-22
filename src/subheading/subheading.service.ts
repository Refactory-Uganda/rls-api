/* eslint-disable prettier/prettier */
// src/sub-heading/sub-heading.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';

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

  async findAll() {
    return this.prisma.subHeading.findMany();
  }

  async findOne(id: string) {
    return this.prisma.subHeading.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSubHeadingDto: CreateSubHeadingDto) {
    return this.prisma.subHeading.update({
      where: { id },
      data: updateSubHeadingDto,
    });
  }

  async remove(id: string) {
    return this.prisma.subHeading.delete({
      where: { id },
    });
  }
}
