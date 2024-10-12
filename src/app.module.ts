import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { ModulesModule } from './modules/modules.module';
import { ContentModule } from './content/content.module';
import { FacilitatorModule } from './facilitator/facilitator.module';
import { AuthModule } from './auth/auth.module'; // AuthModule includes AuthService

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global configuration
    HttpModule, // For external API calls (e.g., fetching roles)
    CourseModule,
    PrismaModule,
    ModulesModule,
    ContentModule,
    FacilitatorModule,
    AuthModule, // Ensure AuthModule is imported
  ],
  controllers: [], // You can add global controllers here if needed
  providers: [], // You can add global providers here if needed
})
export class AppModule {}
