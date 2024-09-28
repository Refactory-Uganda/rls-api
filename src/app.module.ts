/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [DatabaseModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
