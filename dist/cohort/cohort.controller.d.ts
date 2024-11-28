import { CohortService } from './cohort.service';
import { CreateCohortModuleDto } from '../modules/dto/create-cohortModule.dto';
import { UpdateCohortDto } from '../modules/dto/update-cohort.dto';
export declare class CohortController {
    private readonly cohortService;
    constructor(cohortService: CohortService);
    getAllCohorts(): Promise<any>;
    getCohortById(cohortId: string): Promise<any>;
    createCohortModule(cohortId: string, createCohortModuleDto: CreateCohortModuleDto): Promise<{
        message: string;
        cohort: any;
    }>;
    updateCohort(cohortId: string, updateCohortDto: UpdateCohortDto): Promise<{
        message: string;
        cohort: any;
    }>;
    patchCohort(cohortId: string, partialUpdateDto: Partial<UpdateCohortDto>): Promise<{
        message: string;
        cohort: any;
    }>;
    deleteCohort(cohortId: string): Promise<{
        message: string;
    }>;
}
