import { slideContentType } from '@prisma/client';
export declare class CreateSlideDto {
    title: string;
    order: number;
    content: string;
    contentType: slideContentType;
    lessonId: string;
}
