/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { LearnerService } from './learner.service';

@Controller('learner')
export class LearnerController {
    constructor(private readonly learnerService: LearnerService) {}

    @Get()
    getLearner() {
        return this.learnerService.getAll();
    }
    
}
