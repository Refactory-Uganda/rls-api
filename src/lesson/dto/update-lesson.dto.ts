/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateLessonDto } from "./create-lesson.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
    @IsString()
    @IsOptional()
    @ApiProperty()
    id?: string;
}