/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LearnerDto } from '../modules/dto/learner.dto';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LearnerService {
  constructor(
    private readonly prisma: PrismaService,
    private httpService: HttpService) {}

  private readonly apiUrl = 'https://rims-api-xufp.onrender.com/students';

  async getAll() {
    const response = await this.httpService
      .get(
        'https://rims-api-xufp.onrender.com/#/Accounts/StudentLoginController_login',
      )
      .toPromise();
    return response.data;
  }

  async fetchLearners(){
    const response = await this.httpService.get(`${this.apiUrl}`).toPromise(); 
    return response.data
  }

  async fetchById(learnerId: string) {
    const response = await this.httpService
      .get(`${this.apiUrl}/${learnerId}`)
      .toPromise();
    return response.data;
  }

  async fetchByIds(learnerIds: string[]) {
    const requests = learnerIds.map((id) => axios.get(`${this.apiUrl}/${id}`));
    const responses = await Promise.all(requests);
    const learners = responses.map((response) => response.data);

    const learnerObjectIds = await Promise.all(
      learners.map(async (learner) => {
        if(!learner.physicalAddress){
          throw new Error(`Physical Address is missing for learner: ${JSON.stringify(learner)}`);
        }
        if (!learner.physicialAddress.userId) {
          throw new Error(`UserId is required for learner: ${JSON.stringify(learner)}`);
        }

        const userResponse = await axios.get(`https://rims-api-xufp.onrender.com/users/${learner.physicalAddress.userId}`);
        const user = userResponse.data;
        if (!user) {
          throw new Error(`User not found for learner with userId: ${learner.physicalAddress.userId}`);
        }
       
        return { ...learner, user };
      })
    )

    return learnerObjectIds;
  }





  async getLearner(learnerId: string): Promise<LearnerDto> {
    const response = await this.httpService
      .get(
        `https://rims-api-xufp.onrender.com/#/Accounts/StudentLoginController_login/${learnerId}`,
      )
      .toPromise();
    return response.data;
  }
}
