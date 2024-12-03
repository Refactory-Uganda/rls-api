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
    Get,
    Delete,
    Put,
  } from '@nestjs/common';
  import { AssignmentService } from './assignment.service';
  import { CreateAssignmentDto } from './dto/create-assignment.dto';
  import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  // import { multerOptions } from '../uploads/upload.config'; // Import the multer options
  import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
  
  @Controller('assignments')
  @ApiTags('Assignments')
  export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) {}

    // Upload Assignment Question (Facilitator)
    @Put(':id/upload-question')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload assignment question' })
    async uploadAssignmentQuestion(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
      try {
        const filePath = file.path;
        const fileName = file.originalname;
        const result = await this.assignmentService.uploadAssignmentQuestion(id, filePath, fileName);
        return { result };
      } catch (error) {
        throw new HttpException('Failed to upload assignment question', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // Create Assignment (Facilitator)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create a new assignment' })
    async create(@Body() createAssignmentDto: CreateAssignmentDto, @UploadedFile() file?: Express.Multer.File) {
      try {
        const newAssignment = await this.assignmentService.createAssignment(createAssignmentDto, file);
        return newAssignment;
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
    @ApiConsumes('multipart/form-data')
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

    // Get All Assignments
    @Get()
    @ApiOperation({ summary: 'Get all assignments' })
    async getAllAssignments() {
      try {
        return await this.assignmentService.getAllAssignments();
      } catch (error) {
        throw new HttpException('Failed to get assignments', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    // Get Assignment by ID
    @Get(':id')
    @ApiOperation({ summary: 'Get an assignment by ID' })
    async getAssignmentById(@Param('id') id: string) {
      try {
        return await this.assignmentService.getAssignmentById(id);
      } catch (error) {
        throw new HttpException('Failed to get assignment', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    // Delete Assignment
    @Delete(':id/delete')
    @ApiOperation({ summary: 'Delete an assignment' })
    async deleteAssignment(@Param('id') id: string) {
      try {
        return await this.assignmentService.deleteAssignment(id);
      } catch (error) {
        throw new HttpException('Failed to delete assignment', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


  }
  