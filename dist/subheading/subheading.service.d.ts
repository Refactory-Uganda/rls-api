import { PrismaService } from '../prisma/prisma.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';
export declare class SubHeadingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSubHeadingDto: CreateSubHeadingDto): Promise<any>;
    updateSubheading(id: string, updateSubheadingDto: UpdateSubheadingDto): Promise<any>;
    patchSubheading(id: string, partialUpdateDto: UpdateSubheadingDto): Promise<any>;
    remove(id: string): Promise<any>;
}
