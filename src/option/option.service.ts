import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto, UpdateOptionDto } from './dto/option.dto';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    return this.prisma.option.create({
      data: createOptionDto,
    });
  }

  async findAll() {
    return this.prisma.option.findMany();
  }

  async findOne(id: string) {
    return this.prisma.option.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOptionDto: UpdateOptionDto) {
    return this.prisma.option.update({
      where: { id },
      data: updateOptionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.option.delete({
      where: { id },
    });
  }
}
