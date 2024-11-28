import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class FacilitatorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFacilitatorById(externalId: string): Promise<any>;
    createFacilitator(createUser: CreateUserDto): Promise<any>;
    getStaffFromRims(): Promise<void>;
}
