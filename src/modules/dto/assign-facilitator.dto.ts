/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
export class AssignFacilitatorDto {
    @ApiProperty()
    facilitatorId: string;

    @ApiProperty()
    moduleId: string;
}