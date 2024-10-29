/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/sub-heading/sub-heading.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch, Put } from '@nestjs/common';
import { SubHeadingService } from './subheading.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';

@Controller('sub-headings')
@ApiTags('textContent SubHeader')
export class SubHeadingController {
  constructor(private readonly subHeadingService: SubHeadingService) {}

  @Post()
  @ApiOperation({summary: 'create subheader'})
  create(@Body() createSubHeadingDto: CreateSubHeadingDto) {
    return this.subHeadingService.create(createSubHeadingDto);
  }


  @Put(':subheading_id')
  @ApiOperation({ summary: 'Update subheading' })
  @ApiBody({ type: UpdateSubheadingDto })
  async update(@Body() updateSubheadingDto: UpdateSubheadingDto, @Param('subheading_id') subheading_id: string) {
    return this.subHeadingService.updateSubheading(subheading_id, updateSubheadingDto);
  }

  @Patch(':subheading_id')
  @ApiOperation({ summary: 'Patch subheading' })
  @ApiBody({ type: UpdateSubheadingDto })
  async patch(
    @Param('subheading_id') subheading_id: string,
    @Body() partialUpdateDto: Partial<UpdateSubheadingDto>,
  ) {
    return this.subHeadingService.updateSubheading(subheading_id, partialUpdateDto);
  }

  
  @Delete(':id')
  @ApiOperation({summary: 'delete a particular subheader'})
  remove(@Param('id') id: string) {
    return this.subHeadingService.remove(id);
  }
}
