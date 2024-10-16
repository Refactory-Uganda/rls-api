/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  async findAll() {
    const modules = await this.modulesService.findAll();
    return { modules: modules }
  }

  @Get(':moduleId')
  async findOne(@Param('moduleId') moduleId: string) {
    const module = await this.modulesService.findOne(moduleId);
    return { module: module}
  }

  @Patch(':moduleId')
  async update(@Param('moduleId') moduleId: string, @Body() updateModuleDto: UpdateModuleDto) {
    return await this.modulesService.update(moduleId, updateModuleDto);
  }

  @Delete(':moduleId')
async remove(@Param('moduleId') moduleId: string) {
    try {
        const result = await this.modulesService.remove(moduleId);
        return {
            message: 'Module deleted successfully',
            data: result,
        };
    } catch (error) {
        console.error('Error removing module:', error.message);
        throw new HttpException(
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Delete operation failed',
                details: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

}
