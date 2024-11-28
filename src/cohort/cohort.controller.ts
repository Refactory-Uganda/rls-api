/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortModuleDto } from '../modules/dto/create-cohortModule.dto';
import { UpdateCohortDto } from '../modules/dto/update-cohort.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('cohorts')
@ApiTags('Cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Get()
  @ApiOperation({ summary: ' Get All Cohorts ' })
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
  @ApiOperation({ summary: ' Get Cohort by ID ' })
  async getCohortById(@Param('cohortId') cohortId: string) {
    const moduleData = {};
    try {
      const cohort = await this.cohortService.getModuleById(
        cohortId,
        moduleData,
      );
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

  @Post('cohortId/modules')
  @ApiOperation({ summary: ' Create Cohort Module ' })
  async createCohortModule(
    @Param('cohortId') cohortId: string,
    @Body() createCohortModuleDto: CreateCohortModuleDto,
  ) {
    try {
      const newCohortModule = await this.cohortService.createCohortModule(
        cohortId,
        createCohortModuleDto,
      );
      console.log('I am running');
      return {
        message: 'Cohort module created successfully',
        cohort: newCohortModule,
      };
    } catch (error) {
      throw new HttpException(
        `Error creating cohort module: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('cohortId')
  @ApiOperation({ summary: ' Update Cohort ' })
  async updateCohort(
    @Param('cohortId') cohortId: string,
    @Body() updateCohortDto: UpdateCohortDto,
  ) {
    try {
      const updatedCohort = await this.cohortService.updateCohort(
        cohortId,
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

  @Patch(':cohortId')
  @ApiOperation({ summary: ' Partially Update Cohort' })
  async patchCohort(
    @Param('cohortId') cohortId: string,
    @Body() partialUpdateDto: Partial<UpdateCohortDto>,
  ) {
    try {
      const patchedCohort = await this.cohortService.patchCohort(
        cohortId,
        partialUpdateDto,
      );
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

  @Delete(':cohortId')
  @ApiOperation({ summary: ' Delete a Cohort ' })
  async deleteCohort(@Param('cohortId') cohortId: string) {
    try {
      const deleted = await this.cohortService.deleteCohort(cohortId);
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
