import { ApiProperty } from "@nestjs/swagger";
import { slideContentType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";


export class CreateSlideDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    order: number;

    @IsString()
    @ApiProperty()
    content: string;

    @IsString()
    @ApiProperty()
    @IsEnum(slideContentType)
    contentType: slideContentType;

    @IsString()
    @ApiProperty()
    lessonId: string;

}