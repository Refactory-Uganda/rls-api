import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateCohortDto } from './dto/create-cohort.dto';

@Injectable()
export class ProgramService {
  constructor(private readonly httpService: HttpService) {}

  baseUrl = 'https://rims-api-xufp.onrender.com';

  async createProgram(createProgramDto: CreateProgramDto): Promise<any> {
    const url = `${this.baseUrl}/programs`;
    try {
      const response = await this.httpService.post(url, createProgramDto).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to create program at ${url}:`, error.message);
      throw new Error('Failed to create program');
    }
  }

  async getAllPrograms(): Promise<any> {
    const url = `${this.baseUrl}/programs`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch programs from ${url}:`, error.message);
      throw new Error('Failed to retrieve programs');
    }
  }

  async getProgramById(id: string): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch program with id ${id} from ${url}:`, error.message);
      throw new Error('Failed to retrieve program');
    }
  }

  async updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    try {
      const response = await this.httpService.patch(url, updateProgramDto).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to update program with id ${id} at ${url}:`, error.message);
      throw new Error('Failed to update program');
    }
  }

  async updateAllProgramData(id: string, updateProgramDto: UpdateProgramDto): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    try {
      const response = await this.httpService.put(url, updateProgramDto).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to update all data for program with id ${id} at ${url}:`, error.message);
      throw new Error('Failed to update program data');
    }
  }

  async deleteProgram(id: string): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    try {
      const response = await this.httpService.delete(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to delete program with id ${id} at ${url}:`, error.message);
      throw new Error('Failed to delete program');
    }
  }

  async createCohort(createCohortDto: CreateCohortDto, id: string): Promise<any> {
    const url = `${this.baseUrl}/cohorts`;
    const cohortData = {
      ...createCohortDto,
      id,
  };
  
    try {
      const response = await this.httpService.post(url, cohortData).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to create cohort at ${url}:`, error.message);
      throw new Error('Failed to create cohort');
    }
  }

  async getAllCohorts(): Promise<any> {
    const url = `${this.baseUrl}/programs/cohorts`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch cohorts from ${url}:`, error.message);
      throw new Error('Failed to retrieve cohorts');
    }
  }

  async getCohortsByProgramId(ProgramId: string): Promise<any> {
    const url = `${this.baseUrl}/programs/${ProgramId}/cohorts`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch cohorts for program with id ${ProgramId} from ${url}:`, error.message);
      throw new Error('Failed to retrieve cohorts for program');
    }
  }

  async getCohortById(id: string): Promise<any> {
    const url = `${this.baseUrl}/cohorts/${id}`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch cohort with id ${id} from ${url}:`, error.message);
      throw new Error('Failed to retrieve cohort');
    }
  }
}
