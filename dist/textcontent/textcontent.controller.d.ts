import { TextContentService } from './textcontent.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';
export declare class TextContentController {
    private readonly textContentService;
    remove(id: string): void;
    delete(id: string): void;
    constructor(textContentService: TextContentService);
    create(createTextContentDto: CreateTextContentDto): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
    update(updateTextContentDto: UpdateTextContentDto, textcontent_id: string): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
    patch(textcontent_id: string, partialUpdateDto: Partial<UpdateTextContentDto>): Promise<{
        id: string;
        heading: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string | null;
    }>;
}
