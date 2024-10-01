/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}),CourseModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
