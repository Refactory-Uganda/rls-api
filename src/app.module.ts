/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { FacilitatorModule } from './facilitator/facilitator.module';
import { AuthModule } from './auth/auth.module'; // AuthModule includes AuthService
import { MailModule } from './mail/mail.module';
import { CohortModule } from './cohort/cohort.module';
import { LearnerModule } from './learner/learner.module';
import { ModulesModule } from './modules/modules.module';
import { ProgramModule } from './program/program.module';
import { CoursesModule } from './courses/courses.module';
import { TopicsModule } from './topic/topic.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global configuration
    HttpModule, // For external API calls (e.g., fetching roles)
    PrismaModule,
    ModulesModule,
    FacilitatorModule,
    AuthModule,
    MailModule,
    CohortModule,
    LearnerModule,
    ProgramModule,
    CoursesModule,
    TopicsModule,
    LessonModule, // Ensure AuthModule is imported
  ],
  controllers: [], // You can add global controllers here if needed
  providers: [], // You can add global providers here if needed
})
export class AppModule {}
