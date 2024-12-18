import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { DocUploadService } from './docUpload.service';
import { AssignmentSubmissionService } from './submission.service';
import { AssignmentSubmissionController } from './submission.controller';

@Module({
  providers: [AssignmentService, DocUploadService, AssignmentSubmissionService],
  controllers: [AssignmentController, AssignmentSubmissionController]
})
export class AssignmentModule {}
