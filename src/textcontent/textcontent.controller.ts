// src/text-content/text-content.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { TextContentService } from './textcontent.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('text-content')
@ApiTags('textcontent')
export class TextContentController {
  constructor(private readonly textContentService: TextContentService) {}

  @Post()
  @ApiOperation({ summary: 'Create textcontent' })
  async create(@Body() createTextContentDto: CreateTextContentDto) {
    return this.textContentService.create(createTextContentDto);
  }
}
