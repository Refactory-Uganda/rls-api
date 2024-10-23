/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { options, ...questionData } = createQuestionDto;

    const question = await this.prisma.question.create({
      data: {
        ...questionData,
        Option: {
          create: options || [],
        },
      },
      include: { Option: true },
    });

    return {'Question': question}
  }
  async findAll() {
    return this.prisma.question.findMany({ include: { Option: true } });
  }

  async findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
      include: { Option: true },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
