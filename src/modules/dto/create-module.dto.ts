/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

/* eslint-disable prettier/prettier */
export class CreateModuleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    moduleTitle: string

    @ApiProperty()
    @IsString()
    moduleDescription?: string

    @ApiProperty()
    @IsString()
    courseId: string

    // contents: CreateContentDto[];
    

}
