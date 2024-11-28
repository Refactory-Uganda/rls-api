import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
export declare class SlideController {
    private readonly slideService;
    constructor(slideService: SlideService);
    create(createSlideDto: CreateSlideDto): Promise<Slide>;
    getAllByLesson(lessonId: string): Promise<Slide[]>;
    findOne(id: string): Promise<Slide>;
    update(id: string, updateSlideDto: UpdateSlideDto): Promise<Slide>;
    patch(id: string, updateSlideDto: UpdateSlideDto): Promise<Slide>;
    delete(id: string): Promise<Slide>;
}
