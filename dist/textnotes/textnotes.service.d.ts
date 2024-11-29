import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';
export declare class NoteService {
    private prisma;
    update(id: string, updateNoteDto: UpdateTextnotesDto): void;
    constructor(prisma: PrismaService);
    create(createNoteDto: CreateNoteDto): Promise<{
        id: string;
        notesText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    updateTextnotes(id: string, updateTextnotesDto: UpdateTextnotesDto): Promise<{
        id: string;
        notesText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    patchTextnotes(id: string, partialUpdateDto: UpdateTextnotesDto): Promise<{
        id: string;
        notesText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        notesText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
}
