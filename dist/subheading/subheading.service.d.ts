import { PrismaService } from '../prisma/prisma.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';
export declare class SubHeadingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSubHeadingDto: CreateSubHeadingDto): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    updateSubheading(id: string, updateSubheadingDto: UpdateSubheadingDto): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    patchSubheading(id: string, partialUpdateDto: UpdateSubheadingDto): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
}
