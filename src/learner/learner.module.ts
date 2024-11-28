/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [LearnerService],
  controllers: [LearnerController],
  exports: [LearnerService],
})
export class LearnerModule {}
