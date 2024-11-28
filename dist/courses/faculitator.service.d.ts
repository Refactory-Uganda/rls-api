import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class FacilitatorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFacilitatorById(externalId: string): Promise<{
        id: string;
        email: string;
        externalId: string;
        firstName: string;
        lastName: string;
        userGroup: import(".prisma/client").$Enums.Groups;
        nationality: string | null;
        residence: string | null;
        refresh_token: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createFacilitator(createUser: CreateUserDto): Promise<{
        id: string;
        email: string;
        externalId: string;
        firstName: string;
        lastName: string;
        userGroup: import(".prisma/client").$Enums.Groups;
        nationality: string | null;
        residence: string | null;
        refresh_token: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getStaffFromRims(): Promise<void>;
}
