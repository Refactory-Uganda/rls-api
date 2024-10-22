import { Module } from '@nestjs/common';
import { SubheadingService } from './subheading.service';
import { SubheadingController } from './subheading.controller';

@Module({
  providers: [SubheadingService],
  controllers: [SubheadingController]
})
export class SubheadingModule {}
