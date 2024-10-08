/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { AssignFacilitatorDto } from './dto/assign-facilitator.dto';

@Controller('course/:courseId/modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  async createModule(@Param('courseId') courseId: string, @Body() createModuleDto: CreateModuleDto) {
    return await this.modulesService.create(createModuleDto);
  }

  @Post('assign-facilitator')
  assignFacilitator(@Body() assignFacilitatorDto: AssignFacilitatorDto) {
    return this.modulesService.assignFacilitator(assignFacilitatorDto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('courseId') courseId: string,@Param('id') id: string) {
    return this.modulesService.findOne(courseId, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Param('courseId') courseId:string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, courseId,updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('courseId') courseId:string) {
    return this.modulesService.remove(id, courseId);
  }


}
