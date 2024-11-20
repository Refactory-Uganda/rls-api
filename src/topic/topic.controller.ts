/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Param, Delete, Patch, Get, UseInterceptors, HttpCode, HttpStatus, UploadedFile } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) { }

  @Post(':course_id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/topics',
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

  @ApiOperation({ summary: 'Create Topic' })
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
          description: 'Title of the Topic'
        },
        Description: {
          type: 'string',
          minLength: 10,
          maxLength: 500,
          description: 'Add a detailed description of the topic'
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Cover image file (supported formats: jpg, png)',
          // maxSize: '5MB'
        },
        courseId: {
          type: 'string',
          description: 'add a Course ID'

        }

      }
    }
  })

  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('course_id') course_id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateTopicDto,
  ) {
    if (image) {
      body.image = image.filename
    }
    return this.topicService.create({ ...body, courseId: course_id });
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update Topic' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateTopicDto: UpdateTopicDto,
  // ) {
  //   return this.topicService.updateTopic(id, updateTopicDto);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially Update Topic' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/topics',
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      // required: ['Title', 'courseId'],
      properties: {
        Title: {
          type: 'string',
          minLength: 3,
          maxLength: 100,
          description: 'Update Title of the Topic'
        },
        Description: {
          type: 'string',
          minLength: 10,
          maxLength: 500,
          description: 'Update the detailed description of the topic'
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Update Cover image file (supported formats: jpg, png)',
          // maxSize: '5MB'
        },
        courseId: {
          type: 'string',
          description: 'add a Course ID'

        }

      }
    }
  })
  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: UpdateTopicDto,
    @UploadedFile() image? : Express.Multer.File
  ) {
    if(image) {
      partialUpdateDto.image = image.filename
    }
    return this.topicService.patchTopic(id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Topic' })
  deleteTopic(@Param('id') id: string) {
    return this.topicService.deleteTopic(id);
  }


  @Get()
  @ApiOperation({ summary: 'Get all Topics by courseId' })
  async findAllTopics() {
    return await this.topicService.findAllTopicsByCourse();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get Topic by id' })
  async findOneTopic(@Param('id') id: string) {
    return await this.topicService.findOneTopic(id);
  }
}