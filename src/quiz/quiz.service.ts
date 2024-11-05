/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Prisma, Question, Quiz } from '@prisma/client';
import { CreateQuestionDto } from "src/question/dto/create-question.dto";
import { SubmitAnswerDto } from './dto/submitAnswer.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  // quiz with just crud operations

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
            option: true
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
            option: true
          }
        }
      },
    });
  }

  async findByQuizId(quizId: string): Promise<Quiz> {
    return this.prisma.quiz.findUnique({
      where: {
        id: quizId
      },
      include: {
        questions: {
          include: {
            option: true
          }
        }
      }
    })
  }


  // Quiz with submit

  // start quiz
  async startQuiz( quizId: string) {
    // check if quiz exists
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // calculate maxium score 
    const maxScore = quiz.questions.length;

    // create a quiz attempt
    return this.prisma.quizAttempt.create({
      data: {
        quizId,
        // userId,
        score: 0, // initial score
        maxScore, // maximum score as per the questions in the quiz
        status: 'IN_PROGRESS',
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                option: true
              }
            }
          }
        }
      }
    })
  }

  // submit quiz
  async submitAnswer( attemptId: string, answerDto: SubmitAnswerDto) {
    // check attempt exists and belongs to the user
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        // userId,
        status: 'IN_PROGRESS',
      }
    });

    if(!attempt) {
      throw new NotFoundException('Quiz attempt already completed')
    }

    // check question belongs to the quiz
    const question = await this.prisma.question.findFirst({
      where: {
        id: answerDto.questionId,
        quiz: {
          id: attempt.quizId
        }
      },
      include: {
        option: true
      }
    });
    if(!question) {
      throw new BadRequestException('Invalid question');
    }

    // check if option belongs to the question
    const selectedOption = question.option.find(s_option => s_option.id === answerDto.optionId);
    if(!selectedOption) {
      throw new BadRequestException('Invalid option');
    }

    // Record user's answer
    const userAnswer = await this.prisma.userAnswer.create({
      data: {
        quizAttemptId: attemptId,
        questionId: question.id,
        selectedOptionId: selectedOption.id,
        isCorrect: selectedOption.iscorrect,
      }
    });

    return userAnswer;

  }

  // complete quiz
  async completeQuiz( attemptId: string) {
    // check attempt exists and belongs to the user
    const attempt =  await this.prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        // userId,
        status: 'IN_PROGRESS',
      },
      include: {
        answers: true,
        quiz: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!attempt) {
      throw new NotFoundException('Quiz attempt not found');
    }

    // calculate score
    const correctAnswers = attempt.answers.filter(answer => answer.isCorrect).length;
    const score = (correctAnswers / attempt.quiz.questions.length) * attempt.maxScore;

    // update attempt with the final score
    return this.prisma.quizAttempt.update({
      where: { id: attemptId },
      data: {
        score,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      include: {
        answers: {
          include: {
            question: true,
            selectedOption: true
          }
        }
      }
    });
  }

  // get user's quiz results
  async getQuizResults( attemptId: string) {
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        // userId,
        status: 'COMPLETED',
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                option: true
              }
            }
          }
        },
        answers: {
          include: {
            question: true,
            selectedOption: true
          }
        }
      }
    });

    if(!attempt) {
      throw new NotFoundException('Completed Quiz attempt not found');
    }

    return {
      score: attempt.score,
      maxScore: attempt.maxScore,
      percentage: (attempt.score / attempt.maxScore) * 100,
      completedAt: attempt.completedAt,
      answers: attempt.answers.map(answer => ({
        question: answer.question.text,
        selectedAnswer: answer.selectedOption.optionText,
        isCorrect: answer.isCorrect,
        correctOption: attempt.quiz.questions.find(q => q.id === answer.questionId)?.option.find(opt => opt.iscorrect)?.optionText,
      }))
    }
  }

}
