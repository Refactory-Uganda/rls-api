/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('learner')
@ApiTags('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}


  @Get()
  @ApiOperation({ summary: 'Get all learners' })
  fetchLearners(){
    return this.learnerService.fetchLearners()
  }
}
