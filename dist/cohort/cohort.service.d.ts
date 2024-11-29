import { CreateCohortModuleDto } from '../modules/dto/create-cohortModule.dto';
export declare class CohortService {
    getAllCohorts(): Promise<any>;
    getModuleById(cohortId: string, moduleData: any): Promise<any>;
    updateCohort(cohortId: string, updateData: any): Promise<any>;
    patchCohort(cohortId: string, updateData: any): Promise<any>;
    deleteCohort(cohortId: string): Promise<any>;
    createCohortModule(cohortId: string, createCohortModuleDto: CreateCohortModuleDto): Promise<any>;
}
