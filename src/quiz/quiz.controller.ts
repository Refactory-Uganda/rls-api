/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post(':lesson_id')
  @ApiOperation({summary: 'Create a new quiz'})
  create(@Param('lesson_id') lesson_id:string, @Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially Update Quiz' })
  @ApiBody({ type: UpdateQuizDto })
  async patch(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateQuizDto>,
  ) {
    return this.quizService.patchQuiz(id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a Quiz'})
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  @Get(':quizId')
@ApiOperation({ summary: 'Get a Quiz and its Questions' })
async findQuizAndQuestions(
  @Param('quizId') quizId: string
) {
  return await this.quizService.findQuizById(quizId);
}

 @Get()
 @ApiOperation({ summary: 'Get all Quizzes' })
 findAll() {
  return this.quizService.findQuizzes();
}
}
