/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreateNoteDto } from "./create-note.dto";

export class UpdateTextnotesDto extends PartialType(CreateNoteDto) {}