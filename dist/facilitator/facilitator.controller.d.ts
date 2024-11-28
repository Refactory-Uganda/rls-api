import { FacilitatorService } from './facilitator.service';
export declare class FacilitatorController {
    private readonly facilitatorService;
    constructor(facilitatorService: FacilitatorService);
    getFacilitator(): Promise<any>;
    getProtectedResource(): {
        message: string;
    };
}
