import { Module } from '@nestjs/common';
import { SubHeadingService } from './subheading.service';
import { SubHeadingController } from './subheading.controller';

@Module({
  providers: [SubHeadingService],
  controllers: [SubHeadingController]
})
export class SubheadingModule {}
