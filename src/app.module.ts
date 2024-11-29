/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { FacilitatorModule } from './facilitator/facilitator.module';
// import { AuthModule } from './auth/auth.module'; // AuthModule includes AuthService
import { MailModule } from './mail/mail.module';
import { CohortModule } from './cohort/cohort.module';
import { LearnerModule } from './learner/learner.module';
import { ModulesModule } from './modules/modules.module';
import { ProgramModule } from './program/program.module';
import { CoursesModule } from './courses/courses.module';
import { TopicsModule } from './topic/topic.module';
import { LessonModule } from './lesson/lesson.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SlideModule } from './slide/slide.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }), // Global configuration
    HttpModule, // For external API calls (e.g., fetching roles)
    PrismaModule,
    ModulesModule,
    FacilitatorModule,
    // AuthModule,
    MailModule,
    CohortModule,
    LearnerModule,
    ProgramModule,
    CoursesModule,
    TopicsModule,
    LessonModule,
    QuizModule,
    QuestionModule,
    OptionModule,
    AuthenticationModule,
    SlideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
