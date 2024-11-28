/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateSubHeadingDto } from './create-sub-heading.dto';

export class UpdateSubheadingDto extends PartialType(CreateSubHeadingDto) {}
