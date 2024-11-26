/* eslint-disable prettier/prettier */
// src/note/note.controller.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { NoteService } from './textnotes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';

@Controller('notes')
@ApiTags('Notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'create notes' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Put(':textnotes_id')
  @ApiOperation({ summary: 'Update Textnotes' })
  async update(
    @Param('textnotes_id') textnotes_id: string,
    @Body() updateTextnotesDto: UpdateTextnotesDto,
  ) {
    return this.noteService.updateTextnotes(textnotes_id, updateTextnotesDto);
  }

  @Patch(':textnotes_id')
  @ApiOperation({ summary: 'Partially Update Textnotes' })
  @ApiBody({ type: UpdateTextnotesDto })
  async patch(
    @Param('textnotes_id') textnotes_id: string,
    @Body() partialUpdateDto: Partial<UpdateTextnotesDto>,
  ) {
    return this.noteService.patchTextnotes(textnotes_id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a particular note' })
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
