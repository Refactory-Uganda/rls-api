/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { TextContent } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

// export class CreateLessonDto {
//     @IsString()
//     @IsNotEmpty()
//     @ApiProperty()
//     title: string;

//     @ApiProperty()
//     content?: TextContent[];

//     @IsString()
//     @ApiProperty()
//     topicId?: string;
// }
// dto/create-lesson.dto.ts
export class CreateNoteDto {
    @ApiProperty()
    notesText: string;
  }
  
  export class CreateSubHeadingDto {
    @ApiProperty()
    subText: string;
  }
  
  export class CreateTextContentDto {
    @ApiProperty()
    heading: string;
    @ApiProperty()
    notes?: CreateNoteDto[];
    @ApiProperty()
    subHeadings?: CreateSubHeadingDto[];
  }
  
  export class CreateLessonDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    topicId?: string;
    @ApiProperty()
    content: CreateTextContentDto[];
  }
  