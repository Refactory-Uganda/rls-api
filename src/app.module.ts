/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { ContentModule } from './content/content.module';
import { FacilitatorModule } from './facilitator/facilitator.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true}),CourseModule, PrismaModule, ModulesModule, ContentModule, FacilitatorModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
