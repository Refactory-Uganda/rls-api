/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
@ApiTags('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially Update Questions' })
  @ApiBody({ type: UpdateQuestionDto })
  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateQuestionDto>,
  ) {
    return this.questionService.patchQuestion(id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  findAll() {
    return this.questionService.findQuestions();
  }

  @Get(':question_id')
  @ApiOperation({ summary: 'Get question by id' })
  findOne(@Param('question_id') question_id: string) {
    return this.questionService.findQuestionById(question_id);
  }
}
