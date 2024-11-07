/* eslint-disable prettier/prettier */
import { ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { SubmitAnswerDto } from "./submitAnswer.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SubmitQuizDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    quizId: string;

    @IsString()
    attemptId: string;

    @ValidateNested({ each: true })
    @ApiProperty({ type: [SubmitAnswerDto] ,
        description: 'The topics of the course'
    })
    @ArrayNotEmpty()
    answers: SubmitAnswerDto[];
}