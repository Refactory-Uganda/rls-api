// src/text-content/text-content.module.ts
import { Module } from '@nestjs/common';
import { TextContentService } from './textcontent.service';
import { TextContentController } from './textcontent.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TextContentController],
  providers: [TextContentService, PrismaService],
})
export class TextContentModule {}
