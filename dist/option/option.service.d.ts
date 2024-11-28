import { PrismaService } from '../prisma/prisma.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOptionDto: CreateOptionDto): Promise<any>;
    patchOption(id: string, partialUpdateDto: UpdateOptionDto): Promise<any>;
    findOptionById(optionId: string): Promise<any>;
    findAll(): Promise<any>;
    remove(id: string): Promise<any>;
}
