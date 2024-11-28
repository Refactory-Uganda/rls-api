import { TextContentService } from './textcontent.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';
export declare class TextContentController {
    private readonly textContentService;
    constructor(textContentService: TextContentService);
    create(createTextContentDto: CreateTextContentDto): Promise<any>;
    update(updateTextContentDto: UpdateTextContentDto, textcontent_id: string): Promise<any>;
    patch(textcontent_id: string, partialUpdateDto: Partial<UpdateTextContentDto>): Promise<any>;
}
