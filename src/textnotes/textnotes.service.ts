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

//   async findAll() {
//     return this.prisma.note.findMany();
//   }

//   async findOne(id: string) {
//     return this.prisma.note.findUnique({
//       where: { id },
//     });
//   }

//   async update(id: string, updateNoteDto: CreateNoteDto) {
//     return this.prisma.note.update({
//       where: { id },
//       data: updateNoteDto,
//     });
//   }

//   async remove(id: string) {
//     return this.prisma.note.delete({
//       where: { id },
//     });
//   }
}
