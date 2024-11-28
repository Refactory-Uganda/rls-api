import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { CreateCohortDto } from './dto/create-cohort.dto';
export declare class ProgramController {
    private readonly programService;
    constructor(programService: ProgramService);
    createProgram(createProgramDto: CreateProgramDto): Promise<any>;
    getAllPrograms(): Promise<any>;
    getProgramById(id: string): Promise<any>;
    updateProgram(id: string, updateProgramDto: UpdateProgramDto): Promise<any>;
    updateAllProgramData(id: string, updateProgramDto: UpdateProgramDto): Promise<any>;
    deleteProgram(id: string): Promise<any>;
    createCohort(id: string, createCohortDto: CreateCohortDto): Promise<any>;
    getAllCohorts(): Promise<any>;
    getCohortsByProgramId(programId: string): Promise<any>;
    getCohortById(id: string): Promise<any>;
}
