/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LearnerDto } from '../modules/dto/learner.dto';

@Injectable()
export class LearnerService {
    constructor(private httpService: HttpService) {}

    async getAll() {
        const response = await this.httpService.get('https://rims-api-xufp.onrender.com/#/Accounts/StudentLoginController_login').toPromise();
        return response.data;
    }

    async  getLearner(learnerId:string): Promise<LearnerDto> {
        const response = await this.httpService.get(`https://rims-api-xufp.onrender.com/#/Accounts/StudentLoginController_login/${learnerId}`).toPromise();
        return response.data;
    }
}
