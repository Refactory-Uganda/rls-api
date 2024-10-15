/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CohortService } from './cohort.service';

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
}

