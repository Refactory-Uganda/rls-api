/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator"

/* eslint-disable prettier/prettier */
export class CreateModuleDto {
    @IsString()
    @IsNotEmpty()
    moduleTitle: string

    @IsString()
    moduleDescription?: string

    @IsString()
    courseId: string

    // contents: CreateContentDto[];
    

}
