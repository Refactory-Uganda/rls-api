import { PrismaService } from '../prisma/prisma.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class LessonService {
    private prisma;
    constructor(prisma: PrismaService);
    createNew(createLessonDto: CreateLessonDto): Promise<any>;
    patchLesson(id: string, partialUpdateDto: UpdateLessonDto): Promise<any>;
    deleteLesson(id: string): Promise<any>;
    findAllLessons(): Promise<any>;
    findLessonById(lessonId: string): Promise<any>;
}
