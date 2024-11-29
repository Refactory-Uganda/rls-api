import { LearnerService } from './learner.service';
export declare class LearnerController {
    private readonly learnerService;
    constructor(learnerService: LearnerService);
    getLearner(): Promise<any>;
}
