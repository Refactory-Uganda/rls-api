// assignment.controller.ts
import {
    Controller,
    Post,
    Body,
    Param,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { AssignmentService } from './assignment.service';
  import { CreateAssignmentDto } from './dto/create-assignment.dto';
  import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  // import { multerOptions } from '../uploads/upload.config'; // Import the multer options
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  
  @Controller('assignments')
  @ApiTags('Assignments')
  export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) {}
  
    // Create Assignment (Facilitator)
    @Post()
    @ApiOperation({ summary: 'Create a new assignment' })
    async create(@Body() createAssignmentDto: CreateAssignmentDto) {
      try {
        return await this.assignmentService.createAssignment(createAssignmentDto);
      } catch (error) {
        throw new HttpException(
          'Failed to create assignment, please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    // Submit Assignment (Learner)
    @Post(':assignmentId/submit')
    @UseInterceptors(FileInterceptor('answerUpload'))
    @ApiOperation({ summary: 'Submit an assignment' })
    async submit(
      @Param('assignmentId') assignmentId: string,
      @UploadedFile() file: Express.Multer.File, // Use Multer to handle file upload
    ) {
      try {
        if (!file) {
          throw new BadRequestException('File is required');
        }
  
        // Call the service to submit the assignment
        const submission = await this.assignmentService.submitAssignment(
          assignmentId,
          file.path, // Path to the uploaded file
        );
        return submission;
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error; // Propagate the BadRequestException if file is missing
        }
        throw new HttpException('Failed to submit assignment', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  