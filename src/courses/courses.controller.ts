/* eslint-disable prettier/prettier */
// src/course/course.controller.ts
import {
  Controller,
  Delete,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  BadRequestException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './images.service';
import { FacilitatorService } from './faculitator.service';
import { ParseArrayPipe } from './pipes/parse-array.pipe';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
 

@Controller('courses')
@ApiTags('Course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly imageService: ImageService,
    private readonly facilitatorService: FacilitatorService
  ) {}

  // from image service
  @Post('upload-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB
        })
        .build({
          errorHttpStatusCode: 422,
        }),
    )
    file: Express.Multer.File,
  ) {
    const fileId = await this.imageService.saveImage(file);
    return fileId;
  }

  
// staff from Rims
@Post('getstafffromrims')
async getStaffFromRims() {
  await this.facilitatorService.getStaffFromRims();
  return {
    message: 'Facilitators have been fetched and stored successfully.'
  }
}

  //  courses and staff

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Course' })
  async deleteCourse(@Param('id') id: string) {
    return await this.courseService.deleteCourse(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/courses',
        filename: (req, file, callback) => {
          // generate a unique name for the file
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueName}${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // validate the file type to only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
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
          description: 'Update Title of the course',
        },
        Description: {
          type: 'string',
          minLength: 10,
          maxLength: 1000,
          description: 'Update Detailed description of the content',
        },
        Duration: {
          type: 'string',
          pattern: '^(1[0-2]|[1-9])week(s)?$',
          description: 'Update Duration in format: 6 weeks, 12 weeks ',
        },
        status: {
          type: 'string',
          enum: ['DRAFT', 'PUBLISHED'],
          default: 'DRAFT',
          description: 'Update Current status of the content',
        },
        courseOutline: {
          type: 'array',
          items: { type: 'string' },
          description: 'Update the different outlines of the course',
        },
        facilitator: {
          type: 'string',
        },
        requirements: {
          type: 'array',
          items: { type: 'string' },
          description: 'Update what is needed to take this course',
        },
        assessmentMode: {
          type: 'string',
        },
        award: {
          type: 'string',
        },
        courseObjective: {
          type: 'array',
          items: { type: 'string' },
          description: 'Update the targets of the course',
        },
        // topics: { type: 'array', items: { type: 'object' } },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Update Cover image file (supported formats: jpg, png)',
          // maxSize: '5MB'
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    if (image) {
      updateCourseDto.image.filePath = image.filename;
    }
    return this.courseService.patchCourse(id, updateCourseDto);
  }

  @Get('staff')
  async staffFacilitator() {
    return await this.courseService.staffFacilitator();
  }

  @Get('staff/:id')
  async getStaffById(@Param('id') staffId: string) {
    return await this.courseService.getStaffById(staffId);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrator')
  @ApiOperation({ summary: 'Get all Courses' })
  async findAll() {
    // @Query('limit') limit: number = 2 // @Query('page') page: number = 1,
    return await this.courseService
      .findAll
      // Number(page),Number(limit)
      ();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Course by ID' })
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, callback) => {
        // validate the file type to only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Create a Course draft' })
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
          description: 'Title of the course/lesson',
        },
        Description: {
          type: 'string',
          minLength: 10,
          maxLength: 1000,
          description: 'Detailed description of the content',
        },
        Duration: {
          type: 'string',
          pattern: '^(1[0-2]|[1-9])week(s)?$',
          description: 'Duration in format: 6 weeks, 12 weeks ',
        },
        status: {
          type: 'string',
          enum: ['DRAFT', 'PUBLISHED', 'DELETED'],
          default: 'DRAFT',
          description: 'Current status of the content',
        },
        courseOutline: {
          type: 'array',
          items: { type: 'string' },
          description: 'write the different outlines of the course',
        },
        facilitator: {
          type: 'string',
        },
        requirements: {
          type: 'array',
          items: { type: 'string' },
          description: 'what is needed to take this course',
        },
        assessmentMode: {
          type: 'string',
        },
        award: {
          type: 'string',
        },
        courseObjective: {
          type: 'array',
          items: { type: 'string' },
          description: 'write the targets of the course',
        },
        // topics: { type: 'array', items: { type: 'object' } },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Cover image file (supported formats: jpg, png)',
          // maxSize: '5MB'
        },
      },
    },
  })  
  @UsePipes(new ParseArrayPipe())
  @HttpCode(HttpStatus.CREATED) // Set the response status code to 201
  async createCourseP_D(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    console.log('Recieved DTO:', createCourseDto); // Debugging
    console.log('Recieved Image:', image); // Debugging
    if (image) {
      try {
        // upload image 
        const driveResponse = await this.imageService.saveImage(image);
        createCourseDto.image = createCourseDto.image || {};
        console.log('Drive Response:', driveResponse);
        createCourseDto.image.webContentLink = driveResponse.webContentLink;
      }catch(error){
        console.error('Error uploading image:', error);
        throw new BadRequestException('Failed to upload image to Drive');
      }
    }
    return this.courseService.createCourseDraft(createCourseDto);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a Course' })
  @HttpCode(HttpStatus.OK) // Set the response status code to 200
  async publishCourse(@Param('id') id: string) {
    return this.courseService.publishCourse(id);
  }

  @Patch(`:id/draft`)
  @ApiOperation({ summary: 'Draft a Course' })
  @HttpCode(HttpStatus.OK) // Set the response status code to 200
  async draftCourse(@Param('id') id: string) {
    return this.courseService.draftCourse(id);
  }


  

}
