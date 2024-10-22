/* eslint-disable prettier/prettier */
// src/text-content/text-content.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TextContentService } from './textcontent.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('text_content')
@ApiTags('textcontent')
export class TextContentController {
  constructor(private readonly textContentService: TextContentService) {}

  @Post()
  @ApiOperation({ summary: 'Create textcontent' })
  async create(@Body() createTextContentDto: CreateTextContentDto) {
    return this.textContentService.createNew(createTextContentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all textcontent' })
  async findAll() {
    return this.textContentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a particular textcontent' })
  async findOne(id: string) {
    return this.textContentService.findOne(id);
  }
}
