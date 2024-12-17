import { HttpService } from "@nestjs/axios";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

    async enrollLearner(dto: CreateEnrollmentsDto) {
      const { courseId, learnerId } = dto;

      // check for course availablity
      const course = await this.prisma.course.findUnique({
        where: { id: courseId }
      });
      if(!course){
        throw new NotFoundException('course is either deleted or never ever existed!!!!!');
      }

      // check availabilty of the learner (are they already assigned or do they exist in the db)
      const learner = await this.prisma.user.findUnique({
        where: {id: learnerId}
      });
      if(!learner){
        throw new NotFoundException('Learner doesnot exist in db!!!!!!')
      }

      // now are they enrolled(learner)
      const existingEnrollment = await this.prisma.enrollment.findFirst({
        where: {
          courseId,
          learnerId
        }
      });
      if (existingEnrollment){
        throw new ConflictException('Learner is already enrolled!!!! poa bwana')
      }

      // create enrollment
      return this.prisma.enrollment.create({
        data:{
          courseId,
          learnerId
        },
        include:{
          course: true,
          learner:true
        }
      })
    }


  // async bulkEnrollStudents(courseId: string, learnerIds: string[]) {
  //   // Check if the course exists
  //   const course = await this.prisma.course.findUnique({
  //     where: { id: courseId }
  //   });
  //   if (!course) {
  //     throw new NotFoundException('Course not found');
  //   }

  //   // Validate all learner IDs
  //   const invalidLearners = await Promise.all(
  //     learnerIds.map(async (learnerId) => {
  //       const learner = await this.prisma.user.findUnique({
  //         where: { id: learnerId }
  //       });
  //       return learner ? null : learnerId;
  //     })
  //   );

  //   const filteredInvalidLearners = invalidLearners.filter(id => id !== null);
  //   if (filteredInvalidLearners.length > 0) {
  //     throw new NotFoundException(`Learners not found: ${filteredInvalidLearners.join(', ')}`);
  //   }

  //   // Prepare bulk enrollment data
  //   const enrollmentData = learnerIds.map(learnerId => ({
  //     courseId,
  //     learnerId
  //   }));

  //   // Perform bulk insert, skipping existing enrollments
  //   return this.prisma.enrollment.createMany({
  //     data: enrollmentData,
  //     skipDuplicates: true
  //   });
  // }

  async getEnrollmentsByCourse(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: {
        learner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
  }


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

    // async learnerEnroll(dto: CreateEnrollmentsDto) {
    //     const { courseId, learnerIds } = dto
        
    //     console.log('Input courseId:', courseId);
    //     console.log('Input learnerIds:', learnerIds);
      
    //     const course = await this.prisma.course.findUnique({
    //       where: {
    //         id: courseId
    //       }
    //     });
        
    //     if (!course) {
    //       throw new BadRequestException('courseId is Invalid')
    //     }
        
    //     // fetch learners
    //     const learners = [];
    //     for (const learnerId of learnerIds) {
    //       const learner = await this.learnerService.fetchById(learnerId);
    //       if (!learner) {
    //         throw new BadRequestException(`Learner not found for learnerId: ${learnerId}`);
    //       }
    //       learners.push(learner);
    //     }
        
    //     // enroll student
    //     const enroll = await Promise.all(
    //       learners.map(async (learner) => {
    //         console.log('Full Learner Object:', JSON.stringify(learner, null, 2));
            
    //         // Prioritize userId from userPhoneNumber, fallback to physicalAddress
    //         const learnerId = learner.userPhoneNumber?.userId || learner.physicalAddress?.userId;
            
    //         if (!learnerId) {
    //           throw new BadRequestException(`No valid learner ID found for learner: ${JSON.stringify(learner)}`);
    //         }
            
    //         // Remove hyphens from learnerId
    //         const cleanLearnerId = learnerId.replace(/-/g, '');
      
    //         console.log('Cleaned LearnerId:', cleanLearnerId);
    //         console.log('Course ID:', courseId);
      
    //         try {
    //           return this.prisma.enrollment.create({
    //             data: {
    //               learnerId: cleanLearnerId,
    //               courseId: courseId // Use the original courseId as it's already a valid ObjectId
    //             }
    //           })
    //         } catch (error) {
    //           console.error('Enrollment Creation Error:', error);
    //           throw error;
    //         }
    //       })
    //     )
        
    //     return enroll
    //   }
}