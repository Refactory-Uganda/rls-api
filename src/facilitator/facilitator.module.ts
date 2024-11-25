/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FacilitatorService } from './facilitator.service';
import { FacilitatorController } from './facilitator.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule 

@Module({
  imports: [HttpModule,AuthModule],
  providers: [FacilitatorService],
  controllers: [FacilitatorController],
  exports: [FacilitatorService],
})
export class FacilitatorModule {}
