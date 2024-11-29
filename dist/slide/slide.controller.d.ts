import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
export declare class SlideController {
    private readonly slideService;
    constructor(slideService: SlideService);
    create(createSlideDto: CreateSlideDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string;
        order: number;
        content: string;
        contentType: import(".prisma/client").$Enums.slideContentType;
    }>;
    getAllByLesson(lessonId: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string;
        order: number;
        content: string;
        contentType: import(".prisma/client").$Enums.slideContentType;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string;
        order: number;
        content: string;
        contentType: import(".prisma/client").$Enums.slideContentType;
    }>;
    update(id: string, updateSlideDto: UpdateSlideDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string;
        order: number;
        content: string;
        contentType: import(".prisma/client").$Enums.slideContentType;
    }>;
    patch(id: string, updateSlideDto: UpdateSlideDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string;
        order: number;
        content: string;
        contentType: import(".prisma/client").$Enums.slideContentType;
    }>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        lessonId: string;
        order: number;
        content: string;
        contentType: import(".prisma/client").$Enums.slideContentType;
    }>;
}
