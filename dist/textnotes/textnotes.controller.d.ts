import { NoteService } from './textnotes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateTextnotesDto } from './dto/update-textnotes.dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(createNoteDto: CreateNoteDto): Promise<any>;
    update(textnotes_id: string, updateTextnotesDto: UpdateTextnotesDto): Promise<any>;
    patch(textnotes_id: string, partialUpdateDto: Partial<UpdateTextnotesDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
