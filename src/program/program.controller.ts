import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateCohortDto } from './dto/create-cohort.dto';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async createProgram(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.createProgram(createProgramDto);
  }

  @Get()
  async getAllPrograms() {
    return this.programService.getAllPrograms();
  }

  @Get('cohorts')
  async getAllCohorts() {
    return this.programService.getAllCohorts();
  }

  @Get(':id')
  async getProgramById(@Param('id') id: string) {
    return this.programService.getProgramById(id);
  }

  @Patch(':id')
  async updateProgram(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.updateProgram(id, updateProgramDto);
  }

  @Put(':id')
  async updateAllProgramData(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.updateAllProgramData(id, updateProgramDto);
  }

  @Delete(':id')
  async deleteProgram(@Param('id') id: string) {
    return this.programService.deleteProgram(id);
  }

  // Cohorts related endpoints
  @Post(':id/cohorts')
  async createCohort(@Body() createCohortDto: CreateCohortDto) {
    return this.programService.createCohort(createCohortDto);
  }


  @Get(':Id/cohorts')
  async getCohortsByProgramId(@Param('Id') Id: string) {
    return this.programService.getCohortsById(Id);
  }

  @Get(':id /cohorts/:cohorts_id')
  async getCohortById(@Param('id') id: string) {
    return this.programService.getCohortById(id);
  }
}
