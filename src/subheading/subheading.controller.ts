// src/sub-heading/sub-heading.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { SubHeadingService } from './subheading.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';

@Controller('sub-headings')
export class SubHeadingController {
  constructor(private readonly subHeadingService: SubHeadingService) {}

  @Post()
  create(@Body() createSubHeadingDto: CreateSubHeadingDto) {
    return this.subHeadingService.create(createSubHeadingDto);
  }

//   @Get()
//   findAll() {
//     return this.subHeadingService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.subHeadingService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateSubHeadingDto: CreateSubHeadingDto) {
//     return this.subHeadingService.update(id, updateSubHeadingDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.subHeadingService.remove(id);
//   }
}
