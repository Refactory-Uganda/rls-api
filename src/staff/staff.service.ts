import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';



dotenv.config(); 
@Injectable()
export class StaffService {
  private readonly apiUrl='http://localhost:3001/staff';  

  async getStaff(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,  
        },
      });
      return response.data;  
    } catch (error) {
      throw new HttpException('Failed to fetch staff', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
