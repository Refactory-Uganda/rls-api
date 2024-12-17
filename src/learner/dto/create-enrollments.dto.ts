import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateEnrollmentsDto {
    @ApiProperty()
    @IsString()
    courseId: string;

    @ApiProperty()
    @IsString()
    learnerId: string;
  }