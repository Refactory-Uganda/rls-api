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

  @Put('textnotes_id')
  @ApiOperation({ summary: 'Update Textnotes' })
  async update(
    @Param('textnotes_id') textnotes_id: string,
    @Body() updateTextnotesDto: UpdateTextnotesDto,
  ) {
    return this.textnotesService.updateTextnotes(textnotes_id, updateTextnotesDto);
  }

  @Patch('textnotes_id')
  @ApiOperation({ summary: 'Partially Update Textnotes' })
  async patch(
    @Param('textnotes_id') textnotes_id: string,
    @Body() partialUpdateDto: Partial<UpdateTextnotesDto>,
  ) {
    return this.textnotesService.patchTextnotes(textnotes_id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a particular note'})
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }


}
