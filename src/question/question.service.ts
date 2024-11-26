/* eslint-disable prettier/prettier */
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
    const { option, ...questionData } = createQuestionDto;

    const question = await this.prisma.question.create({
      data: {
        ...questionData,
        // Option: {
        //   create: options || [],
        // },
      },
      include: { option: true },
    });

    return {'Question': question}
  }

  async patchQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
    const { option, ...questionData } = updateQuestionDto;
  
    // Step 1: Update the question
    const updatedQuestion = await this.prisma.question.update({
      where: { id },
      data: {
        text: questionData.text,
        answer: questionData.answer,
        order: questionData.order,
        explanation: questionData.explanation,
        quizId: questionData.quizId,
        option: {
          upsert: option?.map(option => ({
            where: { id: option.id },
            create: {
              optionText: option.optionText,
              isCorrect: option.isCorrect,
              order: option.order,
            },
            update: {
              optionText: option.optionText,
              iscorrect: option.isCorrect,
              order: option.order,
            },
          })) || [],
        },
      },
      include: {
        option: true,
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
      include: {
        option: true,
      }
    });
  }

  async findQuestionById(id:string) {
    return this.prisma.question.findUnique({
      where: {
        id: id,
      },
      include: {
        option: true,
  }
})

}
}
