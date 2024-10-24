import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto } from './dto/option.dto';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    return this.prisma.option.create({
      data: createOptionDto,
    });
  }
  
  async remove(id: string) {
    return this.prisma.option.delete({
      where: { id },
    });
  }
}
