import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DocUploadService } from "./docUpload.service";
import { SubmissionStatus } from "@prisma/client";
import { GradeSubmissionDto, SubmitAssignmentDto } from "./dto/submit-assignment.dto";

@Injectable()
export class AssignmentSubmissionService {
    constructor(
        private prisma: PrismaService,
        private docUploadService: DocUploadService
    ) {}


      // Submit an Assignment (by Learner)

  async submitAssignment(submitAssignmentDto: SubmitAssignmentDto, file: Express.Multer.File): Promise<any> {
    // check if assignment exists
    const assignment = await this.prisma.assignment.findUnique({
      where: {id: submitAssignmentDto.assignmentId}
    });

    if(!assignment) {
      throw new NotFoundException('Assignment Doesnot Exist')
    }

    // check due date
    const status = assignment.dueDate < new Date() 
    ? SubmissionStatus.LATE 
    : SubmissionStatus.SUBMITTED ;

    // Upload file
    const answerUpload = await this.docUploadService.uploadFile(file, 'assignment-submissions');

    // check if user already submitted answer
    const existingSubmission = await this.prisma.assignmentSubmission.findFirst({
      where: {
        assignmentId: submitAssignmentDto.assignmentId,
        // add a user if you have one
      }
    });

    // delete previous file if it exists
    if (existingSubmission) {
      if (existingSubmission.answerUpload) {
        await this.docUploadService.deleteFile(existingSubmission.answerUpload);
      }
      return this.prisma.assignmentSubmission.update({
        where: { id: existingSubmission.id },
        data: {
          answerUpload,
          submittedAt: new Date(),
        }
      });
    }
    // create new submission
    return this.prisma.assignmentSubmission.create({
      data:{
        assignmentId: submitAssignmentDto.assignmentId,
        answerUpload,
        submittedAt: new Date(),
      }
    });
  }

  async getSubmissions(assignmentId: string) {
    return this.prisma.assignmentSubmission.findMany({
      where: { assignmentId },
    });
  }

  async getUserSubmission(assignmentId: string) {
    return this.prisma.assignmentSubmission.findFirst({
      where: { 
        assignmentId 
      }
    });
  }

    // for facilitator
    async gradeSubmission(
        submissionId: string, 
        grade: GradeSubmissionDto, 
      ) {
        // Validate submission exists
        const submission = await this.prisma.assignmentSubmission.findUnique({
          where: { id: submissionId }
        });
    
        if (!submission) {
          throw new NotFoundException('Submission not found');
        }
    
        // Update submission with grade
        return this.prisma.assignmentSubmission.update({
          where: { id: submissionId },
          data: {
            grade: grade.grade,
            comment: grade.comment,
            status: SubmissionStatus.GRADED
          }
        });
      }
}