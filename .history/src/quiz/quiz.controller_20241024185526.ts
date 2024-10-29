/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({summary: 'Create a new quiz'})
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a Quiz'})
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  
}
