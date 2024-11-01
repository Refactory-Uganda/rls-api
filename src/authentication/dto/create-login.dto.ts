/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'example@email.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ description: ' Add your Password '})
    @IsString()
    password: string;

    @IsEnum(['Administrator','Staff','Student','User'])
    @ApiProperty({
        description: 'The Different users who can access these accounts',
        enum: ['Administrator','Staff','Student','User'],
        enumName: 'User Roles'
    })
    userGroup: 'Administrator' | 'Staff' | 'Student' | 'User'; 

}