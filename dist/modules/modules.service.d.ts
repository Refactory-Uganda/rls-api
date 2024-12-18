import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { HttpService } from '@nestjs/axios';
export declare class ModulesService {
    private httpService;
    constructor(httpService: HttpService);
    baseUrl: string;
    create(createModuleDto: CreateModuleDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(moduleId: string): Promise<any>;
    update(moduleId: string, updateModuleDto: UpdateModuleDto): Promise<any>;
    remove(moduleId: string): Promise<any>;
}
