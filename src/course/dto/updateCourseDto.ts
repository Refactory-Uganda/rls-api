/* eslint-disable prettier/prettier */

import { PartialType } from "@nestjs/swagger";
import { CreateCourseDto } from "./createCourseDto";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
