/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CohortService {
  async getAllCohorts() {
    try {
      const response = await axios.get('https://localhost:3001/cohorts', {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cohorts: ${error.message}`);
    }
  }

  async getCohortById(id: string) {
    try {
      const response = await axios.get(`https://localhost:3001/cohorts/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cohort: ${error.message}`);
    }
  }


  async updateCohort(id: string, updateData: any) {
    try {
      const response = await axios.put(`https://localhost:3001/cohorts/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating cohort with PUT: ${error.message}`);
    }
  }

  async patchCohort(id: string, updateData: any) {
    try {
      const response = await axios.patch(`https://localhost:3001/cohorts/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating cohort with PATCH: ${error.message}`);
    }
  }
  
  

  async deleteCohort(id: string) {
    try {
      const response = await axios.delete(`https://localhost:3001/cohorts/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting cohort: ${error.message}`);
    }
  }

  async createCohortModule(cohortId: string, moduleData: any) {
    try {
      const response = await axios.post(`https://localhost:3001/cohorts/${cohortId}/modules`, moduleData, {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating cohort module: ${error.message}`);
    }
  }
  
}



