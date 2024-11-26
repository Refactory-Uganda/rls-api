/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('programs')
@ApiTags('Programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @ApiOperation({ summary: 'Create a Program' })
  async createProgram(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.createProgram(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Programs' })
  async getAllPrograms() {
    return this.programService.getAllPrograms();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Program by Id' })
  async getProgramById(@Param('id') id: string) {
    return this.programService.getProgramById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Program by Id' })
  async updateProgram(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programService.updateProgram(id, updateProgramDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update all Program data by Id' })
  async updateAllProgramData(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programService.updateAllProgramData(id, updateProgramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Program by Id' })
  async deleteProgram(@Param('id') id: string) {
    return this.programService.deleteProgram(id);
  }

  // Cohorts related endpoints
  @Post(':id/cohort') // Route to create a cohort under a specific program
  @ApiOperation({ summary: 'Create a Cohort under a Program' })
  async createCohort(
    @Param('id') id: string, // Extract programId from the route parameters
    @Body() createCohortDto: CreateCohortDto, // Extract the DTO from the request body
  ): Promise<any> {
    return this.programService.createCohort(createCohortDto, id);
  }

  @Get('cohorts')
  @ApiOperation({ summary: 'Get all Cohorts' })
  async getAllCohorts() {
    return this.programService.getAllCohorts();
  }

  @Get(':programId/cohorts')
  @ApiOperation({ summary: 'Get all Cohorts under a Program' })
  async getCohortsByProgramId(@Param('programId') programId: string) {
    return this.programService.getCohortsByProgramId(programId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Cohort' })
  async getCohortById(@Param('id') id: string) {
    return this.programService.getCohortById(id);
  }
}
