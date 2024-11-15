/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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

  

    @ApiProperty({
      description: 'The title of the lesson',
      example: 'Introduction to JavaScript Datatypes',
    })
    @IsString()
    title: string;

    @ApiProperty({
      description: 'The content of the lesson',
      example: 'This lesson is an introduction to JavaScript datatypes....'
    })
    @IsString()
    text?: string;

    @ApiProperty({
      description: 'The topicId of the lesson',
      example: '60b3f7c4f2f5f40015'
    })
    @IsString()
    topicId?: string;

    // @ApiProperty()
    // content?: CreateTextContentDto[];
  }
  