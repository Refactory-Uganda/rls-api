import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';

@Module({
  imports: [HttpModule],
  providers: [ProgramService],
  controllers: [ProgramController]
})
export class ProgramModule {}
