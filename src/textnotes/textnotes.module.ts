import { Module } from '@nestjs/common';
import { TextnotesService } from './textnotes.service';
import { TextnotesController } from './textnotes.controller';

@Module({
  providers: [TextnotesService],
  controllers: [TextnotesController]
})
export class TextnotesModule {}
