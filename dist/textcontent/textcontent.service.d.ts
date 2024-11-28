import { PrismaService } from '../prisma/prisma.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';
export declare class TextContentService {
    private prisma;
    constructor(prisma: PrismaService);
    createNew(dto: CreateTextContentDto): Promise<any>;
    updateTextContent(id: string, updateTextContentDto: UpdateTextContentDto): Promise<any>;
    patchTextContent(id: string, partialUpdateDto: UpdateTextContentDto): Promise<any>;
    delete(id: string): Promise<any>;
}
