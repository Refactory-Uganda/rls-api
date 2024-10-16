/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { HttpModule,  } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
