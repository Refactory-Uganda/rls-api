// src/note/note.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { NoteService } from './textnotes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

//   @Get()
//   findAll() {
//     return this.noteService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.noteService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto) {
//     return this.noteService.update(id, updateNoteDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.noteService.remove(id);
//   }
}
