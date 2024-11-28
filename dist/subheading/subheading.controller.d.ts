import { SubHeadingService } from './subheading.service';
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';
export declare class SubHeadingController {
    private readonly subHeadingService;
    constructor(subHeadingService: SubHeadingService);
    create(createSubHeadingDto: CreateSubHeadingDto): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    update(updateSubheadingDto: UpdateSubheadingDto, subheading_id: string): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    patch(subheading_id: string, partialUpdateDto: Partial<UpdateSubheadingDto>): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        subText: string;
        createdAt: Date;
        updatedAt: Date;
        textContentId: string | null;
    }>;
}
