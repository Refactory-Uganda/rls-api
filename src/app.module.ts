import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module'
import { StaffModule } from './staff/staff.module';


@Module({
  imports: [DatabaseModule, CourseModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
