/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class StartQuizDto {
    @ApiProperty({})
    @IsString()
    quizId: string;
}