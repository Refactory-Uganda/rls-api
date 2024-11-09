/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import { Controller, Delete, Post, Body, Get, Param, HttpCode, HttpStatus, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import {  CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { JwtAuthGaurd } from 'src/authentication/guards/jwt-auth.guard';
// import { RolesGaurd } from 'src/authentication/guards/roles.guard';
// import { Roles } from 'src/authentication/decorators/roles.decorator'; 

@Controller('courses')
@ApiTags('Course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create a Course'})
  // @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  // async createCourse(@Body() createCourseDto: CreateCourseDto) {
  //   return this.courseService.createCourse(createCourseDto);
  // }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a Course'})
    async deleteCourse(@Param('id') id: string) {
        return await this.courseService.deleteCourse(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/courses',
        filename: (req, file, callback) => {
          // generate a unique name for the file
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, `${uniqueName}${file.originalname}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        // validate the file type to only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      }
    }))
    @ApiOperation({ summary: 'Partially update a Course' })
    @ApiBody({
      schema: {
        type: 'object',
        // required: ['Title'],
      properties: { 
        Title: {
          type: 'string',
          minLength: 3,
          maxLength: 100,
          description: 'Update Title of the course/lesson'
        },
        Description: {
          type: 'string',
          minLength: 10,
          maxLength: 1000,
          description: 'Update Detailed description of the content'
        },
        Duration: {
          type: 'string',
          pattern: '^(0?[1-9]|1[0-2])$',
          description: 'Update Duration in format: 1 month, 3 months or 6 months, etc.'
        },
        status: {
          type: 'string',
          enum: ['DRAFT', 'PUBLISHED', 'DELETED'],
          default: 'DRAFT',
          description: 'Update Current status of the content'
        },
          // topics: { type: 'array', items: { type: 'object' } },
          image: {
            type: 'string',
            format: 'binary',
            description: 'Update Cover image file (supported formats: jpg, png)',
            // maxSize: '5MB'
          }
        }
      }
    })
    @ApiConsumes('multipart/form-data')
    async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() image?: Express.Multer.File
    ) {
      if(image) {
        updateCourseDto.image = image.filename;
      }
    return this.courseService.updateCourse(id, updateCourseDto);
    }

  // @Get()
  // @ApiOperation({ summary: 'Get all Courses' })
  // async findAll(
  //   @Query('page') page: number =1,
  //   @Query('limit') limit: number = 6
  // ) {
  //   return await this.courseService.findAll(Number(page),Number(limit));
  // }

  @Get() 
  // @UseGuards(JwtAuthGaurd, RolesGaurd)
  // @Roles('Staff', 'Administrator')
  @ApiOperation({summary: 'Get all Courses'})
  async findAll(
    // @Query('page') page: number = 1,
    // @Query('limit') limit: number = 2
  ) {
    return await this.courseService.findAll(
      // Number(page),Number(limit)
    ); 
  }


  @Get(':id') 
  @ApiOperation({summary: 'Get a Course by ID'})
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id); 
  }

  // get topics specific to a course 
  // @Get(':id/topics')
  // @ApiOperation({summary: 'Get Topics for a Course'})
  // async getTopics() {
  //   return await this.courseService.findCourseTopics();
  // }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/courses',
      filename: (req, file, callback) => {
        // generate a unique name for the file
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueName}${file.originalname}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      // validate the file type to only image files
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    }
  }))
  @ApiOperation({ summary: 'Create a Course draft'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['Title'],
    properties: {
      Title: {
        type: 'string',
        minLength: 3,
        maxLength: 100,
        description: 'Title of the course/lesson'
      },
      Description: {
        type: 'string',
        minLength: 10,
        maxLength: 1000,
        description: 'Detailed description of the content'
      },
      Duration: {
        type: 'string',
        pattern: '^(0?[1-9]|1[0-2])$',
        description: 'Duration in format: 1 month, 3 months or 6 months, etc.'
      },
      status: {
        type: 'string',
        enum: ['DRAFT', 'PUBLISHED', 'DELETED'],
        default: 'DRAFT',
        description: 'Current status of the content'
      },
        // topics: { type: 'array', items: { type: 'object' } },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Cover image file (supported formats: jpg, png)',
          // maxSize: '5MB'
        }
      }
    }
  })
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourseP_D(
    @Body() createCourseDto: CreateCourseDto, 
    @UploadedFile() image?: Express.Multer.File
  ) {
    console.log('Recieved DTO:', createCourseDto); // Debugging
    console.log('Recieved Image:', image); // Debugging
    if(image) {
      createCourseDto.image = image.filename;
    }
    return this.courseService.createCourseDraft(createCourseDto);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a Course'})
  @HttpCode(HttpStatus.OK) // Set the response status code to 200
  async publishCourse(@Param('id') id: string) {
    return this.courseService.publishCourse(id);
  }

  @Patch(`:id/draft`)
  @ApiOperation({ summary: 'Draft a Course'})
  @HttpCode(HttpStatus.OK) // Set the response status code to 200
  async draftCourse(@Param('id') id: string) {
    return this.courseService.draftCourse(id);
  }

}
