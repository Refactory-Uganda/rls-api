/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { options, ...questionData } = createQuestionDto;

    const question = await this.prisma.question.create({
      data: {
        ...questionData,
        // Option: {
        //   create: options || [],
        // },
      },
      include: { Option: true },
    });

    return {'Question': question}
  }

  async remove(id: string) {
    return this.prisma.question.delete({
      where: { id },
    });
  }

  async findQuestions {
    return this.prisma.question.findMany({
      where: {
        quizId: quizId,
      },
    });
  }
  
}
