/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FacilitatorService } from 'src/facilitator/facilitator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ModulesController],
  providers: [ModulesService, PrismaService, FacilitatorService],
})
export class ModulesModule {}
