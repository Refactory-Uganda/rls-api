/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FacilitatorDto } from './dto/facilitator-dto';

@Injectable()
export class FacilitatorService {
    constructor(private httpService: HttpService) {}

    async  getFacilitator(facilitatorId:string): Promise<FacilitatorDto> {
        const response = await this.httpService.get(`http://localhost:3001/staff/${facilitatorId}`).toPromise();
        return response.data;
    }
}
