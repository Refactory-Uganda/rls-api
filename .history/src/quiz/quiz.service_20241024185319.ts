/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { questions, ...quizData } = createQuizDto;

    return this.prisma.quiz.create({
      data: {
        ...quizData,
        // questions: {
        //   create: questions || [],
        // },
      },
      include: { questions: true },
    });
  }


  async remove(id: string) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }

  
}
