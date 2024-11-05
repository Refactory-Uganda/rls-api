/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/option.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateOptionDto } from './dto/update-option.dto';


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
  @ApiOperation({summary: 'Get all options'})
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':option_id')
  @ApiOperation({summary: 'Get option by id'})
  findOne(@Param('option_id') optionId: string) {
    return this.optionService.findOptionById(optionId);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update option'})
  @ApiBody({type: UpdateOptionDto})
  async patchOption(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateOptionDto>,
  ) {
    return await this.optionService.patchOption(id, partialUpdateDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete option'})
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }
}
