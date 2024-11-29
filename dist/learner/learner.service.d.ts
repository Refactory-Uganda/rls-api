import { HttpService } from '@nestjs/axios';
import { LearnerDto } from '../modules/dto/learner.dto';
export declare class LearnerService {
    private httpService;
    constructor(httpService: HttpService);
    getAll(): Promise<any>;
    getLearner(learnerId: string): Promise<LearnerDto>;
}
