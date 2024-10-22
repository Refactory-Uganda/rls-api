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

  @Get()
  @ApiOperation({summary: 'get a all subheader'})
  findAll() {
    return this.subHeadingService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get a particular subheader'})
  findOne(@Param('id') id: string) {
    return this.subHeadingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'update a particular subheader'})
  update(@Param('id') id: string, @Body() updateSubHeadingDto: CreateSubHeadingDto) {
    return this.subHeadingService.update(id, updateSubHeadingDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a particular subheader'})
  remove(@Param('id') id: string) {
    return this.subHeadingService.remove(id);
  }
}
