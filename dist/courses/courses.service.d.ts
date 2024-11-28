import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ImageService } from './images.service';
export declare class CourseService {
    private prisma;
    private imageService;
    private transformToArray;
    constructor(prisma: PrismaService, imageService: ImageService);
    createCourseDraft(dto: CreateCourseDto): Promise<{
        courses: any;
    }>;
    publishCourse(id: string): Promise<any>;
    draftCourse(id: string): Promise<any>;
    patchCourse(id: string, partialUpdateDto: UpdateCourseDto): Promise<any>;
    findAll(): Promise<{
        courses: any;
    }>;
    findOne(id: string): Promise<any>;
    deleteCourse(id: string): Promise<any>;
    staffFacilitator(): Promise<any>;
    getStaffById(staffId: string): Promise<any>;
}
