/* eslint-disable prettier/prettier */
// src/note/note.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto) {
    const { notesText, textContentId } = createNoteDto;

    const note = await this.prisma.note.create({
      data: {
        notesText,
        textContentId,
      },
    });

    return note;
  }

  async remove(id: string) {
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
