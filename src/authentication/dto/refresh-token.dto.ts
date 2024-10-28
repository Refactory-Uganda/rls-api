/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class RefeshTokendto {
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}