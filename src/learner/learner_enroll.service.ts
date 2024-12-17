import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LearnerService } from "./learner.service";
import { CreateEnrollmentsDto } from "./dto/create-enrollments.dto";
import { Types } from "mongoose";

@Injectable()
export class LearnerEnrollService {
    constructor(
        private readonly prisma: PrismaService,
        private learnerService: LearnerService
    ) {}

    // async learnerEnroll( dto: CreateEnrollmentsDto) {
    //     const { courseId, learnerIds } = dto
    //     const course = await this.prisma.course.findUnique({
    //         where: {
    //             id: courseId
    //         }
    //     });

    //     if (!course) {
    //         throw new BadRequestException('courseId is Invalid')
    //     }

    //     // fetch learners
    //     const learners = [];
    //     for (const learnerId of learnerIds) {
    //         const learner = await this.learnerService.fetchById(learnerId);
    //         if (!learner) {
    //             throw new BadRequestException(`Learner not found for learnerId: ${learnerId}`);
    //         }
    //         learners.push(learner);
    //     }

    //     // enroll student
    //     const enroll = await Promise.all(
    //         learners.map(async (learner) => {
    //             console.log('Enrolling learner:', learner);
    //             if (!learner.physicalAddress.userId) {
    //                 throw new BadRequestException(`Learner ID is missing for learner: ${JSON.stringify(learner)}`);
    //             }

    //             const learnerObject = learner.physicalAddress.userId;                

    //             return this.prisma.enrollment.create({
    //                 data: {
    //                     learnerId: learnerObject,
    //                     courseId
    //                 }
    //             })
    //         })
    //     )

    //     return enroll
    // }

    async learnerEnroll(dto: CreateEnrollmentsDto) {
        const { courseId, learnerIds } = dto
        
        console.log('Input courseId:', courseId);
        console.log('Input learnerIds:', learnerIds);
      
        const course = await this.prisma.course.findUnique({
          where: {
            id: courseId
          }
        });
        
        if (!course) {
          throw new BadRequestException('courseId is Invalid')
        }
        
        // fetch learners
        const learners = [];
        for (const learnerId of learnerIds) {
          const learner = await this.learnerService.fetchById(learnerId);
          if (!learner) {
            throw new BadRequestException(`Learner not found for learnerId: ${learnerId}`);
          }
          learners.push(learner);
        }
        
        // enroll student
        const enroll = await Promise.all(
          learners.map(async (learner) => {
            console.log('Full Learner Object:', JSON.stringify(learner, null, 2));
            
            // Prioritize userId from userPhoneNumber, fallback to physicalAddress
            const learnerId = learner.userPhoneNumber?.userId || learner.physicalAddress?.userId;
            
            if (!learnerId) {
              throw new BadRequestException(`No valid learner ID found for learner: ${JSON.stringify(learner)}`);
            }
            
            // Remove hyphens from learnerId
            const cleanLearnerId = learnerId.replace(/-/g, '');
      
            console.log('Cleaned LearnerId:', cleanLearnerId);
            console.log('Course ID:', courseId);
      
            try {
              return this.prisma.enrollment.create({
                data: {
                  learnerId: cleanLearnerId,
                  courseId: courseId // Use the original courseId as it's already a valid ObjectId
                }
              })
            } catch (error) {
              console.error('Enrollment Creation Error:', error);
              throw error;
            }
          })
        )
        
        return enroll
      }
}