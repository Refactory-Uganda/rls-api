import { PrismaService } from '../prisma/prisma.service';
import { Slide } from '@prisma/client';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
export declare class SlideService {
    private prisma;
    constructor(prisma: PrismaService);
    private checkLessonExists;
    create(createSlideDto: CreateSlideDto): Promise<Slide>;
    findAllByLesson(lessonId: string): Promise<Slide[]>;
    findOne(id: string): Promise<Slide>;
    update(id: string, updateSlideDto: UpdateSlideDto): Promise<Slide>;
    delete(id: string): Promise<Slide>;
}
