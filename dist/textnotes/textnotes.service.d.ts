import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';
export declare class NoteService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNoteDto: CreateNoteDto): Promise<any>;
    updateTextnotes(id: string, updateTextnotesDto: UpdateTextnotesDto): Promise<any>;
    patchTextnotes(id: string, partialUpdateDto: UpdateTextnotesDto): Promise<any>;
    remove(id: string): Promise<any>;
}
