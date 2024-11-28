import { PrismaService } from '../prisma/prisma.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';
export declare class TextContentService {
    private prisma;
    constructor(prisma: PrismaService);
    createNew(dto: CreateTextContentDto): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
    updateTextContent(id: string, updateTextContentDto: UpdateTextContentDto): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
    patchTextContent(id: string, partialUpdateDto: UpdateTextContentDto): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
}
