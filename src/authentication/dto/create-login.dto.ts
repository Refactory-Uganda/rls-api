/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'user adds thier email address registered by rims', example: 'example@email.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ description: ' Add your Password ', example: '*******'})
    @IsString()
    password: string;

    @IsEnum(['Administrator','Staff','Student','User'])
    @ApiProperty({
        description: 'The Different users who can access these accounts',
        example: 'Administrator | Staff | Student',
        enumName: 'User Roles'
    })
    userGroup: 'Administrator' | 'Staff' | 'Student' | 'User'; 

}