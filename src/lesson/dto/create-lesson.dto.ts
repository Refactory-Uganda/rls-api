/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
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
    @IsString()
    notesText: string;
  }
  
  export class CreateSubHeadingDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subText: string;
  }
  
  export class CreateTextContentDto {

    @ApiProperty()
    @IsString()
    heading: string;

    @ApiProperty()
    notes?: CreateNoteDto[];

    @ApiProperty()
    subHeadings?: CreateSubHeadingDto[];
  }
  
  export class CreateLessonDto {

    @IsString()
<<<<<<< HEAD
    id: string
=======
    id: string;
>>>>>>> 79465aca0c4fefcb1d14a7a4dff921d483bf5609

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    text?: string;

    @ApiProperty()
    @IsString()
    topicId?: string;

    // @ApiProperty()
    // content?: CreateTextContentDto[];
  }
  