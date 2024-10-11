/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { FacilitatorService } from './facilitator.service';

@Controller('facilitator')
export class FacilitatorController {
    constructor(private readonly facilitatorService: FacilitatorService) {}

    @Get()
    getFacilitator() {
        return this.facilitatorService.getAll();
    }
}
