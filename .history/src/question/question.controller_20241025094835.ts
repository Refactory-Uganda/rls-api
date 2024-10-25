import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';



@Controller('questions')
@ApiTags('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({summary: 'Create a new question'})
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a question'})
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }

  @Get()
  
}
