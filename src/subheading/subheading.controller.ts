/* eslint-disable prettier/prettier */
// src/sub-heading/sub-heading.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { SubHeadingService } from './subheading.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('sub-headings')
@ApiTags('textContent SubHeader')
export class SubHeadingController {
  constructor(private readonly subHeadingService: SubHeadingService) {}

  @Post()
  @ApiOperation({summary: 'create subheader'})
  create(@Body() createSubHeadingDto: CreateSubHeadingDto) {
    return this.subHeadingService.create(createSubHeadingDto);
  }

  
  @Delete(':id')
  @ApiOperation({summary: 'delete a particular subheader'})
  remove(@Param('id') id: string) {
    return this.subHeadingService.remove(id);
  }
}
