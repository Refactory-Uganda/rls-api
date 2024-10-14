import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateCohortDto } from './dto/create-cohort.dto';

@Injectable()
export class ProgramService {
  constructor(private readonly httpService: HttpService) {}

  baseUrl = 'https://rims-api-xufp.onrender.com/';

  async createProgram(createProgramDto: CreateProgramDto): Promise<any> {
    const url = `${this.baseUrl}/programs`;
    return this.httpService.post(url, createProgramDto).toPromise();
  }

  async getAllPrograms(): Promise<any> {
    const url = `${this.baseUrl}/programs`;
    return this.httpService.get(url).toPromise();
  }

  async getProgramById(id: string): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    return this.httpService.get(url).toPromise();
  }

  async updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    return this.httpService.patch(url, updateProgramDto).toPromise();
  }

  async updateAllProgramData(id: string, updateProgramDto: UpdateProgramDto): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    return this.httpService.put(url, updateProgramDto).toPromise();
  }

  async deleteProgram(id: string): Promise<any> {
    const url = `${this.baseUrl}/programs/${id}`;
    return this.httpService.delete(url).toPromise();
  }

  async createCohort(createCohortDto: CreateCohortDto): Promise<any> {
    const url = `${this.baseUrl}/cohorts`;
    return this.httpService.post(url, createCohortDto).toPromise();
  }

  async getAllCohorts(): Promise<any> {
    const url = `${this.baseUrl}/cohorts`;
    return this.httpService.get(url).toPromise();
  }

  async getCohortsById(Id: string): Promise<any> {
    const url = `${this.baseUrl}/programs/${Id}/cohorts`;
    return this.httpService.get(url).toPromise();
  }

  async getCohortById(id: string): Promise<any> {
    const url = `${this.baseUrl}/cohorts/${id}`;
    return this.httpService.get(url).toPromise();
  }
}
