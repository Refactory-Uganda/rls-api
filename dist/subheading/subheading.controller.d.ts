import { SubHeadingService } from './subheading.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';
export declare class SubHeadingController {
    private readonly subHeadingService;
    constructor(subHeadingService: SubHeadingService);
    create(createSubHeadingDto: CreateSubHeadingDto): Promise<any>;
    update(updateSubheadingDto: UpdateSubheadingDto, subheading_id: string): Promise<any>;
    patch(subheading_id: string, partialUpdateDto: Partial<UpdateSubheadingDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
