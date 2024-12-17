/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';
import { HttpModule } from '@nestjs/axios';
import { LearnerEnrollService } from './learner_enroll.service';

@Module({
  imports: [HttpModule],
  providers: [LearnerService, LearnerEnrollService],
  controllers: [LearnerController],
  exports: [LearnerService],
})
export class LearnerModule {}
