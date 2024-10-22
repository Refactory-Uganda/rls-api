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


  async remove(id: string) {
    return this.prisma.subHeading.delete({
      where: { id },
    });
  }
}
