/* eslint-disable prettier/prettier */
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FacilitatorService } from './facilitator.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('facilitator')
export class FacilitatorController {
  constructor(private readonly facilitatorService: FacilitatorService) {}

  @Get()
  getFacilitator() {
    return this.facilitatorService.getAll();
  }

  @Post('protected')
  getProtectedResource() {
    return { message: 'This is a facilitator-only resource' };
  }
}
