/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}),CourseModule, PrismaModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
