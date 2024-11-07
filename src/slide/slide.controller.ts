import { Controller, Get, Post, Param, Body, Put, Delete, Patch } from '@nestjs/common';
import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('slides')
@ApiTags('slides')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  // Create a new slide
  @Post()
  @ApiOperation({ summary: 'Create a new slide' })
  async create(@Body() createSlideDto: CreateSlideDto) {
    return this.slideService.create(createSlideDto);
  }

  // Get all slides for a specific lesson
  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'Get all slides for a specific lesson' })
  async getAllByLesson(@Param('lessonId') lessonId: string) {
    return this.slideService.findAllByLesson(lessonId);
  }

  // Get a single slide by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a slide by ID' })
  async findOne(@Param('id') id: string) {
    return this.slideService.findOne(id);
  }

  // Update a slide (PUT for full update)
  @Put(':id')
  @ApiOperation({ summary: 'Update a slide' })
  async update(@Param('id') id: string, @Body() updateSlideDto: UpdateSlideDto) {
    return this.slideService.update(id, updateSlideDto);
  }

  // Patch a slide (PATCH for partial update)
  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a slide' })
  async patch(@Param('id') id: string, @Body() updateSlideDto: UpdateSlideDto) {
    return this.slideService.update(id, updateSlideDto);
  }

  // Delete a slide by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a slide by ID' })
  async delete(@Param('id') id: string) {
    return this.slideService.delete(id);
  }
}
