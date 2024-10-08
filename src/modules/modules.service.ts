/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignFacilitatorDto } from './dto/assign-facilitator.dto';
import { FacilitatorService } from 'src/facilitator/facilitator.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService, private facilitatorService: FacilitatorService) {}

  async create(createModuleDto: CreateModuleDto) {
    try {
      await this.prisma.module.create({
        data: {
          moduleTitle: createModuleDto.moduleTitle,
          moduleDescription: createModuleDto.moduleDescription,
          courseId: createModuleDto.courseId,
        },
      });
      throw new HttpException(
        {
          status: HttpStatus.CREATED,
          message: `Module ${createModuleDto.moduleTitle} created`,
        },
        HttpStatus.CREATED,
      );
    } catch (error){
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.module.findMany();
  }

  async findOne(courseId:string, id: string) {
    return await this.prisma.module.findUnique({
      where: {id, courseId}
    });
  }
  
  async remove(id: string, courseId: string) {
    return await this.prisma.module.delete({ where:{id, courseId}});
  }
  async update(id: string,courseId: string, updateModuleDto: UpdateModuleDto) {
    try {
      await this.prisma.module.update({
        where: { id, courseId },
        data: {
          moduleTitle: updateModuleDto.moduleTitle,
          moduleDescription: updateModuleDto.moduleDescription,
        },
      });
      throw new HttpException(
        {
          status: HttpStatus.CREATED,message: `Module ${updateModuleDto.moduleTitle} created`,
        },
        HttpStatus.CREATED,
      );
    } catch (error){
      throw error;
    }
  }

  async assignFacilitator(assignFacilitatorDto: AssignFacilitatorDto) {
    const { moduleId, facilitatorId } = assignFacilitatorDto

    const facilitator = await this.facilitatorService.getFacilitator(facilitatorId);

    const updatedModule = await this.prisma.module.update({
      where: { id: moduleId },
      data: {
        facilitatorId: facilitator.id },
    });
    return updatedModule
  }
}



