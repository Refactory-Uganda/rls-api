/* eslint-disable prettier/prettier */
import { AttemptStatus } from "@prisma/client";
import { SubmitAnswerDto } from "./submitAnswer.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class QuizAttemptDto {
    @ApiProperty({})
    @IsString()
    id: string;

    @ApiProperty({})
    @IsString()
    quizId: string;

    @ApiProperty({})
    @IsString()
    userId: string;

    @ApiProperty({})
    score: number;

    @ApiProperty({})
    maxScore: number;

    @ApiProperty({})
    status: AttemptStatus;

    @ApiProperty()
    answers: SubmitAnswerDto[];
}