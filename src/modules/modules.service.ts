/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ModulesService {
  constructor(private httpService: HttpService) {}

  baseUrl = 'https://rims-api-xufp.onrender.com/modules';

  async create(createModuleDto: CreateModuleDto): Promise<any> {
    try {
      const response = await this.httpService
        .post(`${this.baseUrl}`, createModuleDto)
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error Message:', error.Message);

      throw new Error('no work here all wrong');
    }
  }

  async findAll() {
    const response = await this.httpService.get(`${this.baseUrl}`).toPromise();
    return response.data;
  }

  async findOne(moduleId: string) {
    const response = await this.httpService
      .get(`${this.baseUrl}/${moduleId}`)
      .toPromise();
    return response.data;
  }

  async update(moduleId: string, updateModuleDto: UpdateModuleDto) {
    try {
      const response = await this.httpService
        .patch(`${this.baseUrl}/${moduleId}`, updateModuleDto)
        .toPromise();
      console.log(
        'Updating module with ID:',
        moduleId,
        'Data:',
        updateModuleDto,
      );

      return response.data;
    } catch (error) {
      console.error('Error Message:', error.message);
      console.error(
        'Error Response Data:',
        error.response?.data || 'No response data available',
      );
      throw new Error('Update operation failed');
    }
  }

  async remove(moduleId: string) {
    try {
      const response = await this.httpService
        .delete(`${this.baseUrl}/${moduleId}`)
        .toPromise();
      console.log('Deleting module with ID:', moduleId);
      return response.data;
    } catch (error) {
      const statusCode = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Unknown error occurred';

      console.error(
        `Delete operation error (Status: ${statusCode}):`,
        errorMessage,
      );

      if (statusCode === 500) {
        throw new Error(
          'Internal server error occurred while deleting the module.',
        );
      } else {
        throw new Error(`Delete operation failed: ${errorMessage}`);
      }
    }
  }
}
