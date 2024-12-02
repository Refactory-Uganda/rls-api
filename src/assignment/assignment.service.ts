// assignment.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment, Prisma } from '@prisma/client';
import { DocUploadService } from './docUpload.service';

@Injectable()
export class AssignmentService {
  constructor(
    private prisma: PrismaService,
    private docUploadService: DocUploadService
  ) {}


  // upload assignment question
  async uploadAssignmentQuestion(id:string, filepath:string,fileName:string) {
    const fieldId = await this.docUploadService.uploadFile(filepath, fileName);

    await this.prisma.assignment.update({
      where: {id: id},
      data: {
        uploadQuestion: fieldId
      },
    });
    return {fieldId};
  }

  // Create an Assignment
  async createAssignment(data: CreateAssignmentDto): Promise<Assignment> {
    try {
      const newAssignment = await this.prisma.assignment.create({
        data: {
          title: data.title,
          instructions: data.instructions,
          dueDate: new Date(data.dueDate),
          points: data.points,
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

  async getAllAssignments(): Promise<{AllAssignments :Assignment[]}> {
    try{
      const assignments = await this.prisma.assignment.findMany();
      return {AllAssignments : assignments};
    }catch (error) {
      throw new HttpException('Failed to get assignments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAssignmentById(id: string): Promise<{AssignmentById : Assignment}> {
    try {
      const assignment = await this.prisma.assignment.findUnique({
        where: { id },
      })
      return {AssignmentById : assignment};
    }catch (error) {
      throw new HttpException('Failed to get assignment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAssignment(id: string): Promise<{Deleted : Assignment}> {
    try {
      const assignment = await this.prisma.assignment.delete({
        where: { id },
      })
      return { Deleted :assignment};
    }catch (error) {
      throw new HttpException('Failed to delete assignment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
