import { HttpService } from '@nestjs/axios';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateCohortDto } from './dto/create-cohort.dto';
export declare class ProgramService {
    private readonly httpService;
    constructor(httpService: HttpService);
    baseUrl: string;
    createProgram(createProgramDto: CreateProgramDto): Promise<any>;
    getAllPrograms(): Promise<any>;
    getProgramById(id: string): Promise<any>;
    updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<any>;
    updateAllProgramData(id: string, updateProgramDto: UpdateProgramDto): Promise<any>;
    deleteProgram(id: string): Promise<any>;
    createCohort(createCohortDto: CreateCohortDto, id: string): Promise<any>;
    getAllCohorts(): Promise<any>;
    getCohortsByProgramId(ProgramId: string): Promise<any>;
    getCohortById(id: string): Promise<any>;
}
