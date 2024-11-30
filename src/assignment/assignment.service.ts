// assignment.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment, Prisma } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  // Create an Assignment
  async createAssignment(data: CreateAssignmentDto): Promise<Assignment> {
    try {
      const newAssignment = await this.prisma.assignment.create({
        data: {
          title: data.title,
          instructions: data.instructions,
          dueDate: new Date(data.dueDate),
          question: data.question,
          uploadQuestion: data.uploadQuestion || undefined,
        } as Prisma.AssignmentCreateInput,
      });
      return newAssignment;
    } catch (error) {
      console.error('Error creating assignment:', error); // Log error to the console
      throw new HttpException(
        'Failed to create assignment. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  // Submit an Assignment (by Learner)
  async submitAssignment(assignmentId: string, answerUpload: string): Promise<any> {
    try {
      const submission = await this.prisma.assignmentSubmission.create({
        data: {
          assignmentId,
          answerUpload, // Path to the uploaded answer
        },
      });
      return submission;
    } catch (error) {
      throw new HttpException('Failed to submit assignment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
