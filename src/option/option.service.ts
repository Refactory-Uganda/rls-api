/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    return this.prisma.option.create({
      data: createOptionDto,
    });
  }

  async patchOption(id: string, partialUpdateDto: UpdateOptionDto) {
    try {
      const updateData = {
        ...partialUpdateDto,
      };
  
      // Remove undefined properties from the updateData
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });
  
      return await this.prisma.option.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new Error(
        `Error partially updating option with ID ${id}: ${error.message}`,
      );
    }
  }
  
  async findOptionById(optionId: string) {
    return this.prisma.option.findUnique({
      where: {
        id: optionId,
      },
      include: {
        question: true,
      }
    });
  }

  async findAll() {
    return this.prisma.option.findMany({
      include: {
        question: true,
      }
    });
  }
  
  async remove(id: string) {
    return this.prisma.option.delete({
      where: { id },
    });
  }
}
