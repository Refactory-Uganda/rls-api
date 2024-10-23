import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto, UpdateOptionDto } from './dto/option.dto';
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

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }
}
