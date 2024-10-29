/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/text-content/text-content.controller.ts
import { Body, Controller, Get, Post, Put, Param, Patch } from '@nestjs/common';
import { TextContentService } from './textcontent.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';

@Controller('text_content')
@ApiTags('textcontent')
export class TextContentController {
  constructor(private readonly textContentService: TextContentService) {}

  @Post()
  @ApiOperation({ summary: 'Create textcontent' })
  async create(@Body() createTextContentDto: CreateTextContentDto) {
    return this.textContentService.createNew(createTextContentDto);
  }

  @Put(':textcontent_id')
  @ApiOperation({ summary: 'Update textcontent' })
  async update(@Body() updateTextContentDto: UpdateTextContentDto, @Param('textcontent_id') textcontent_id: string) {
    return this.textContentService.updateTextContent(textcontent_id, updateTextContentDto);
  }

  @Patch(':textcontent_id')
  @ApiOperation({ summary: 'Patch textcontent' })
  @ApiBody({ type: UpdateTextContentDto })
  async patch(
    @Param('textcontent_id') textcontent_id: string,
    @Body() partialUpdateDto: Partial<UpdateTextContentDto>,
  ) {
    return this.textContentService.patchTextContent(textcontent_id, partialUpdateDto);
  }
}
