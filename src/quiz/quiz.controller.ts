/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswerDto } from './dto/submitAnswer.dto';
import { StartQuizDto } from './dto/startquiz.dto';
import { SubmitQuizDto } from './dto/submitQuiz.dto';
// import { User } from 'src/decorators/user.decorator';
// import { JwtAuthGaurd } from 'src/authentication/jwt-auth.guard';

@Controller('quizzes')
// @UseGuards(JwtAuthGaurd)
@ApiTags('quizzes')
export class QuizController {
	constructor(private readonly quizService: QuizService) { }

	@Post()
	@ApiOperation({ summary: 'Create a new quiz' })
	create(@Body() createQuizDto: CreateQuizDto) {
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
	@ApiOperation({ summary: 'Delete a Quiz' })
	remove(@Param('id') id: string) {
		return this.quizService.remove(id);
	}

	@Get(':quizId')
	@ApiOperation({ summary: 'Get a Quiz and its Questions' })
	async findQuizAndQuestions(
		@Param('quizId') quizId: string
	) {
		return await this.quizService.findByQuizId(quizId);
	}

	@Get()
	@ApiOperation({ summary: 'Get all Quizzes' })
	findAll() {
		return this.quizService.findQuizzes();
	}



	// quiz with submit
	@Post('start')
	@ApiOperation({ summary: 'Start a new quiz' })
	async startQuiz( @Body() startQuizDto: StartQuizDto) {
		return await this.quizService.startQuiz(startQuizDto.quizId);
	}

	@Post(':attemptId/answer')
	@ApiOperation({ summary: 'Submit an answer' })
	// @ApiBody({ type: answerDto })
	submitAnswer(
		// @User() user: any,
		@Param('attemptId') attemptId: string,
		@Body() answerDto: SubmitAnswerDto,
	) {
		return this.quizService.submitAnswer(attemptId, answerDto);
	}

	@Post(':attemptId/complete')
	@ApiOperation({ summary: 'Complete a quiz' })
	// @ApiBody({ type: CompleteQuizDto })
	completeQuiz(
		// @User() user: any,
		@Param('attemptId') attemptId: string,
	) {
		return this.quizService.completeQuiz( attemptId);
	}

	@Get(':attemptId/results')
	@ApiOperation({ summary: 'Get quiz results' })
	getResults(
		// @User() user: any,
		@Param('attemptId') attemptId: string,
	) {
		return this.quizService.getQuizResults( attemptId);
	}

	@Post(':attemptId/submitQuiz')
	@ApiOperation({ summary: 'Submit an entire Quiz' })
	@ApiResponse({ status: 201, description: 'Quiz submitted successfully' })
	async submitQuiz(
		@Param('attemptId') attemptId: string,
		@Body() submitQuizDto: SubmitQuizDto,
	) {
		const result = await this.quizService.submitQuiz(attemptId,submitQuizDto);
		return {
			status: 'success',
			message: 'Quiz submitted successfully',
			data: result
		}
	}


}
