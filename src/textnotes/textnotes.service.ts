/* eslint-disable prettier/prettier */
// src/note/note.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';

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

  async updateTextnotes(id: string, updateTextnotesDto: UpdateTextnotesDto) {
    try {
      const updateData: {
        notesText?: string;
        textContentId?: string;
      } = {
        notesText: updateTextnotesDto.notesText,
        textContentId: updateTextnotesDto.textContentId,
      };

      return await this.prisma.note.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(`Error updating textnotes with ID ${id}: ${error.message}`);
    }
  }

  async patchTextnotes(id: string, partialUpdateDto: UpdateTextnotesDto) {
    try {
      const partialUpdateData: {
        notesText?: string;
        textContentId?: string;
      } = {
        ...partialUpdateDto,
      };

      return await this.prisma.note.update({
        where: { id },
        data: partialUpdateData,
      });
    } catch (error) {
      throw new Error(
        `Error partially updating textnotes with ID ${id}: ${error.message}`,
      );
    }
  }




  async remove(id: string) {
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
