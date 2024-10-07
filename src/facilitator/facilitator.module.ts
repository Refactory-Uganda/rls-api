import { Module } from '@nestjs/common';
import { FacilitatorService } from './facilitator.service';
import { FacilitatorController } from './facilitator.controller';

@Module({
  providers: [FacilitatorService],
  controllers: [FacilitatorController]
})
export class FacilitatorModule {}
