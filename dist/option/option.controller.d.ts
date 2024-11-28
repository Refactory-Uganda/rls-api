import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(createOptionDto: CreateOptionDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(optionId: string): Promise<any>;
    patchOption(id: string, partialUpdateDto: Partial<UpdateOptionDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
