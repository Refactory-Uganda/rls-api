import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
export declare class ModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    create(createModuleDto: CreateModuleDto): Promise<any>;
    findAll(): Promise<{
        modules: any;
    }>;
    findOne(moduleId: string): Promise<{
        module: any;
    }>;
    update(moduleId: string, updateModuleDto: UpdateModuleDto): Promise<any>;
    remove(moduleId: string): Promise<{
        message: string;
        data: any;
    }>;
}
