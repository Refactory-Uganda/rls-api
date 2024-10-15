/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateCohortModuleDto } from 'src/modules/dto/create-cohortModule.dto';

@Injectable()
export class CohortService {
  async getAllCohorts() {
    try {
      const response = await axios.get('http://localhost:3001/cohorts');
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cohorts: ${error.message}`);
    }
  }

  async getModuleById(cohortId: string, moduleData: any) {
    try {
      const response = await axios.get(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}/modules/`, moduleData);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching module: ${error.message}`);
    }
  }

  async updateCohort(cohortId: string, updateData: any) {
    try {
      const response = await axios.put(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating cohort with PUT: ${error.message}`);
    }
  }

  async patchCohort(cohortId: string, updateData: any) {
    try {
      const response = await axios.patch(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating cohort with PATCH: ${error.message}`);
    }
  }

  async deleteCohort(cohortId: string) {
    try {
      const response = await axios.delete(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting cohort: ${error.message}`);
    }
  }

  async createCohortModule(cohortId: string, createCohortModuleDto: CreateCohortModuleDto) {
    try {
      const response = await axios.post(`https://rims-api-xufp.onrender.com/cohorts/${cohortId}/modules/`,{
        data: JSON.stringify(createCohortModuleDto),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating cohort module: ${error.message}`);
    }
  }
}
