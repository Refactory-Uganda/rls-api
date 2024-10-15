/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Patch, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortModuleDto } from '../modules/dto/create-cohortModule.dto';
import { UpdateCohortDto } from '../modules/dto/update-cohort.dto';
import { create } from 'domain';

@Controller('cohorts')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Get()
  async getAllCohorts() {
    try {
      const cohorts = await this.cohortService.getAllCohorts();
      return cohorts;
    } catch (error) {
      throw new HttpException(
        `Error fetching cohorts: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()

  async getCohortById(@Param('cohortId') cohortId: string) {
    const moduleData = {};
    try {
      const cohort = await this.cohortService.getModuleById(cohortId, moduleData);
      if (!cohort) {
        throw new HttpException('Cohort not found', HttpStatus.NOT_FOUND);
      }
      return cohort;
    } catch (error) {
      throw new HttpException(
        `Error fetching cohort: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async createCohortModule(@Param('cohortId') cohortId: string,@Body() createCohorModuletDto: CreateCohortModuleDto) {
    try {
      const newCohortModule = await this.cohortService.createCohortModule(cohortId,createCohorModuletDto);
      return { message: 'Cohort module created successfully', cohort: newCohortModule };
    } catch (error) {
      throw new HttpException(
        `Error creating cohort module: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateCohort(
    @Param('id') id: string,
    @Body() updateCohortDto: UpdateCohortDto,
  ) {
    try {
      const updatedCohort = await this.cohortService.updateCohort(
        id,
        updateCohortDto,
      );
      if (!updatedCohort) {
        throw new HttpException('Cohort not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Cohort updated successfully', cohort: updatedCohort };
    } catch (error) {
      throw new HttpException(
        `Error updating cohort: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async patchCohort(
    @Param('id') id: string,
    @Body() partialUpdateDto: Partial<UpdateCohortDto>,
  ) {
    try {
      const patchedCohort = await this.cohortService.patchCohort(id, partialUpdateDto);
      if (!patchedCohort) {
        throw new HttpException('Cohort not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Cohort patched successfully', cohort: patchedCohort };
    } catch (error) {
      throw new HttpException(
        `Error patching cohort: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteCohort(@Param('id') id: string) {
    try {
      const deleted = await this.cohortService.deleteCohort(id);
      if (!deleted) {
        throw new HttpException('Cohort not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Cohort deleted successfully' };
    } catch (error) {
      throw new HttpException(
        `Error deleting cohort: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
