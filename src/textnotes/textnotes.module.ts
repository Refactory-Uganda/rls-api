import { Module } from '@nestjs/common';
import { NoteService } from './textnotes.service';
import { NoteController } from './textnotes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, PrismaService],  
})
export class TextnotesModule {}
