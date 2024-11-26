/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateOptionDto } from './option.dto';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {}
