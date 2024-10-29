/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';


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

  async patchQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
    const { options, ...questionData } = updateQuestionDto;
  
    // Step 1: Update the question
    const updatedQuestion = await this.prisma.question.update({
      where: { id },
      data: {
        text: questionData.text,
        answer: questionData.answer,
        order: questionData.order,
        explanation: questionData.explanation,
        quizId: questionData.quizId,
        Option: {
          upsert: options?.map(option => ({
            where: { id: option.id },
            create: {
              optionText: option.optionText,
              iscorrect: option.iscorrect,
              order: option.order,
            },
            update: {
              optionText: option.optionText,
              iscorrect: option.iscorrect,
              order: option.order,
            },
          })) || [],
        },
      },
      include: {
        Option: true,
      },
    });
  
    return updatedQuestion;
  }
  
  

  async remove(id: string) {
    return this.prisma.question.delete({
      where: { id },
    });
  }

  async findQuestions() {
    return this.prisma.question.findMany({
    });
  }
  
}
