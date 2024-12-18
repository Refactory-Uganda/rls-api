import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Groups } from '@prisma/client';

@Injectable()
export class FacilitatorService {
  constructor(private readonly prisma: PrismaService) {}

  // get facilitator by id
  async getFacilitatorById(externalId: string) {
    return await this.prisma.user.findUnique({
      where: {
        externalId,
      },
    });
  }
  async getStudentById(externalId: string) {
    return await this.prisma.user.findUnique({
      where: {
        externalId,
      },
    });
  }

  // create facilitator
  async createFacilitator(createUser: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUser,
    });
  }

  async getStaffFromRims() {
    try {
      const reponse = await axios.get(
        'https://rims-api-xufp.onrender.com/staff',
      );
      const facilitators = reponse.data;

      for (const facilitator of facilitators) {
        // check if facilitator exists in RIMS
        const existingFacilitator = await this.getFacilitatorById(
          facilitator.id,
        );

        if (!existingFacilitator) {
          // create new facilitator in Database
          const newFacilitator = await this.createFacilitator({
            externalId: facilitator.id,
            email: facilitator.email.email,
            firstName: facilitator.firstName,
            lastName: facilitator.lastName,
            userGroup: Groups.Staff,
            nationality: facilitator.nationality || null,
            residence: facilitator.residence || null,
          });
          console.log('user created: ', newFacilitator);
        }
      }
    } catch (error) {
      console.error('Error fetching staff from rims: ', error);
    }
  }
  async getLearnerFromRims() {
    try {
      const reponse = await axios.get(
        'https://rims-api-xufp.onrender.com/students',
      );
      const learners = reponse.data;

      for (const learner of learners) {
        // check if learner exists in RIMS
        const existingLearner = await this.getStudentById(
          learner.id,
        );

        if (!existingLearner) {
          // create new learner in Database
          const newLearner = await this.createFacilitator({
            externalId: learner.id,
            email: learner.email.email,
            firstName: learner.firstName,
            lastName: learner.lastName,
            userGroup: Groups.Student,
            nationality: learner.nationality || null,
            residence: learner.residence || null,
          });
          console.log('user created: ', newLearner);
        }
      }
    } catch (error) {
      console.error('Error fetching Students from rims: ', error);
    }
  }



}
