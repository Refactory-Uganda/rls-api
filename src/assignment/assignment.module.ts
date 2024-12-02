import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { DocUploadService } from './docUpload.service';

@Module({
  providers: [AssignmentService, DocUploadService],
  controllers: [AssignmentController]
})
export class AssignmentModule {}
