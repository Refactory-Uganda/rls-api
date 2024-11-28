import { HttpService } from '@nestjs/axios';
import { FacilitatorDto } from './dto/facilitator-dto';
export declare class FacilitatorService {
    private httpService;
    constructor(httpService: HttpService);
    getAll(): Promise<any>;
    getFacilitator(facilitatorId: string): Promise<FacilitatorDto>;
}
