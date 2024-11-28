import { NoteService } from './textnotes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(createNoteDto: CreateNoteDto): Promise<{
        id: string;
        notesText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    update(textnotes_id: string, updateTextnotesDto: UpdateTextnotesDto): Promise<{
        id: string;
        notesText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    patch(textnotes_id: string, partialUpdateDto: Partial<UpdateTextnotesDto>): Promise<{
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
