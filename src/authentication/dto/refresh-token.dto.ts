/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokendto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The refresh token to use for obtaining a new access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    refresh_token: string;
}
