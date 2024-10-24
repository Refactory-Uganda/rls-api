import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/option.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('options')
@ApiTags('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @ApiOperation({summary: 'Create option'})
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }


  @Delete(':id')
  @ApiOperation({summary: 'Delete option'})
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }
}
