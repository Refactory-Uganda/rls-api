/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LearnerEnrollService } from './learner_enroll.service';
import { CreateEnrollmentsDto } from './dto/create-enrollments.dto';

@Controller('learner')
@ApiTags('learner')
export class LearnerController {
  constructor(
    private readonly learnerService: LearnerService,
    private readonly learnerEnrollService: LearnerEnrollService
  ) {}


// enrollments

@Post('/enroll')
async learnerEnroll(@Body() dto: CreateEnrollmentsDto) { 
    // const { courseId, learnerIds } = dto
    return this.learnerEnrollService.enrollLearner(dto)
}

@Get(':course_id')
async getEnrollmentsByCourse(@Param('courseId') courseId:string){
  return this.learnerEnrollService.getEnrollmentsByCourse(courseId)
}

















  @Get()
  @ApiOperation({ summary: 'Get all learners' })
  fetchLearners(){
    return this.learnerService.fetchLearners()
  }












}
