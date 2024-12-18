export declare class CreateNoteDto {
    notesText: string;
}
export declare class CreateSubHeadingDto {
    subText: string;
}
export declare class CreateTextContentDto {
    heading: string;
    notes?: CreateNoteDto[];
    subHeadings?: CreateSubHeadingDto[];
}
export declare class CreateLessonDto {
    title: string;
    text?: string;
    topicId?: string;
}
