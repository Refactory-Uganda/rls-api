/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Prisma, Question } from '@prisma/client';
import { CreateQuestionDto } from "src/question/dto/create-question.dto";

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    // const { questions, ...quizData } = createQuizDto;

    return this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        description: createQuizDto.description,
        lesson: {
          connect: { id: createQuizDto.lessonId },
        }
      },
    });
  }

  async patchQuiz(id: string, partialUpdateDto: UpdateQuizDto) {
    try {
      const { questions, ...quizData } = partialUpdateDto;
  
      const updateData: Prisma.QuizUpdateInput = {
        ...quizData,
        questions: questions ? {
          update: questions.map(question => ({
            where: { id: question.id },
            data: {
              text: question.text,
              answer: question.answer,
            }
          })),
        } : undefined,
      };
  
      return await this.prisma.quiz.update({
        where: { id },
        data: updateData,
        include: { questions: true },
      });
    } catch (error) {
      throw new Error(`Error partially updating quiz with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: string) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }

  async findQuizById(quizId: string) {
    return this.prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: {
          include: {
            Option: true
          }
        },
      },
    });
  }
  async findQuizzes() {
    return this.prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            Option: true
          }
        }
      },
    });
  }

  async findByQuizId(quizId: string): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: { quizId },
      include: {
        quiz: {
          include: { questions: {
            include: { Option: true }
          } },
        },
      },
    });
  }
}

