import { Module } from '@nestjs/common';
import { TextcontentService } from './textcontent.service';
import { TextcontentController } from './textcontent.controller';

@Module({
  providers: [TextcontentService],
  controllers: [TextcontentController]
})
export class TextcontentModule {}
