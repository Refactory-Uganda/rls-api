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
  import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
  
  @Controller('assignments')
  @ApiTags('Assignments')
  export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) {}

    // Upload Assignment Question (Facilitator)
    @Put(':id/upload-question')
    @UseInterceptors(FileInterceptor('question',{
      storage: memoryStorage(),
      limits: {
        fileSize: 10*1024*1024 // 10mb
      }
    }))
    @ApiOperation({ summary: 'Upload assignment question' })
    async uploadAssignmentQuestion(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
      try {
        return this.assignmentService.uploadQuestion(id, file)
      } catch (error) {
        throw new HttpException('Failed to upload assignment question', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // Create Assignment (Facilitator)
    @Post()
    @UseInterceptors(FileInterceptor('uploadQuestion',{
      storage: memoryStorage(),
      limits: {
        fileSize: 10*1024*1024 // max 10mb
      }
    }))
    @ApiConsumes('multipart/form-data')
    
    @ApiOperation({ summary: 'Create a new assignment' })
    async create(@Body() createAssignmentDto: CreateAssignmentDto, @UploadedFile() file?: Express.Multer.File) {
      // try {
      console.log(' Controller Recieved DTO:', JSON.stringify(createAssignmentDto, null, 2));
      
      const dtoInstance = plainToClass(CreateAssignmentDto, createAssignmentDto, {
        enableImplicitConversion: true,
      })

      const errors = await validate(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', ')).filter(message => message.length > 0);

        throw new BadRequestException(errorMessages.length > 0 ? errorMessages : 'Validation failed');
      }

      console.log('ProcessedDto:', JSON.stringify(dtoInstance, null, 2));
      console.log('File:', file ? {
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: file.path,
      }: 'No file provided');
      
        const newAssignment = await this.assignmentService.create(dtoInstance, file);
        return newAssignment;
      // } catch (error) {
      //   throw new HttpException(
      //     'Failed to create assignment, please try again later.',
      //     HttpStatus.INTERNAL_SERVER_ERROR,
      //   );
      // }
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
  