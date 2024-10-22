/* eslint-disable prettier/prettier */
// src/note/note.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { NoteService } from './textnotes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('notes')
@ApiTags('Notes')

export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({summary: 'create notes'})
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({summary: 'get all notes'})
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get a particular note'})
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update a particular note'})
  update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a particular note'})
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
