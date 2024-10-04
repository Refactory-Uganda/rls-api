import { Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service'; 


@Controller('staff')  
export class StaffController {
  constructor(private readonly staffService:StaffService) {}

  @Get()
  async getAllStaff() {
    return await this.staffService.getStaff();  // Fetch the staff data
  }
}
