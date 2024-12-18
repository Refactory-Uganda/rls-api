/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FacilitatorDto } from './dto/facilitator-dto';

@Injectable()
export class FacilitatorService {
  constructor(private httpService: HttpService) {}

  // Fetch all staff members from RiMs API
  async getAll() {
    const response = await this.httpService
      .get('https://rims-api-xufp.onrender.com/staff') 
      .toPromise();
    return response.data;
  }

  // Fetch a specific facilitator by ID from RiMs API
  async getFacilitator(facilitatorId: string): Promise<FacilitatorDto> {
    const response = await this.httpService
      .get(`https://rims-api-xufp.onrender.com/staff/${facilitatorId}`) 
      .toPromise();
    return response.data;
  }
}
