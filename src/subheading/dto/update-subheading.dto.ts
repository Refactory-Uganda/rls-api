/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubheadingDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subText?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    textContentId?: any;
}