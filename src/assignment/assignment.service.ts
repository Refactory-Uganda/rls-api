// assignment.service.ts
import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment, Prisma } from '@prisma/client';
import { DocUploadService } from './docUpload.service';
import path from 'path';
import * as fs from 'fs';



@Injectable()
export class AssignmentService {
  constructor(
    private prisma: PrismaService,
    private docUploadService: DocUploadService
  ) {}


  // Create an Assignment
async create(createAssignmentDto: CreateAssignmentDto, file?: Express.Multer.File) {
  try{
    let questionFilePath: string | null = null;
    if (file) {
      // confirm file type is pdf,doc,docx
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if(!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException('Only PDF, DOC, and DOCX files are allowed');
      }
      // create uploads folder
      const uploadDir = path.join(process.cwd(), 'uploads', 'assignments');
      if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // create unique filename
      const filename = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadDir, filename);

      // save file
      fs.writeFileSync(filePath, file.buffer);
      if(filename){
        questionFilePath = path.join('uploads', 'assignments', filename);
      }
    }

    const processedDto = {
      ...createAssignmentDto,
      dueDate: new Date(createAssignmentDto.dueDate),
      points: createAssignmentDto.points ? Number(createAssignmentDto.points) : null
    }

    return await this.prisma.assignment.create({
      data: {
        ...processedDto,
        uploadQuestion: questionFilePath,
      },
    });
  }catch(error){
    if(error instanceof BadRequestException){
      throw error;
    }
    throw new BadRequestException(`Failed to create assignment:${error.message}`);
  }
}


async uploadQuestion(id: string, file: Express.Multer.File){
  try{
    const assignment = await this.getAssignmentById(id)

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if(!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only allow Pdf and Doc files');
    }

    if(assignment.uploadQuestion) {
      const oldFilePath = path.join(process.cwd(), assignment.uploadQuestion);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'uploads', 'assignments');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, filename);

    // Save file
    fs.writeFileSync(filePath, file.buffer);
    const questionFilePath = path.join('uploads', 'assignments', filename);

    // Update assignment with new file path
  return await this.prisma.assignment.update({
      where: { id },
      data: {
        uploadQuestion: questionFilePath
      } 
    });

  }catch(error){
    if(error instanceof BadRequestException){
      throw error;
    }
    console.error('Error uploading question:', error);
    throw new HttpException('Failed to upload question', HttpStatus.INTERNAL_SERVER_ERROR);
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

async getAssignmentById(id: string): Promise< Assignment> {
    try {
      const assignment = await this.prisma.assignment.findUnique({
        where: { id },
      })
      if(!assignment){
        throw new NotFoundException(`Assignment with ID ${id} not found`)
      }
      return  assignment;

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


async downloadQuestion(id: string) {
      const assignment = await this.getAssignmentById(id);
  
      if (!assignment.uploadQuestion) {
        throw new NotFoundException('No question file uploaded for this assignment');
      }
  
      const filePath = path.join(process.cwd(), assignment.uploadQuestion);
      
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('Question file not found');
      }
  
      return {
        file: fs.readFileSync(filePath),
        filename: path.basename(filePath),
        mimetype: this.getMimeType(path.extname(filePath))
      };
    }
private getMimeType(ext: string): string {
      switch(ext.toLowerCase()) {
        case '.pdf': return 'application/pdf';
        case '.doc': return 'application/msword';
        case '.docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        default: return 'application/octet-stream';
      }
    }
  }


