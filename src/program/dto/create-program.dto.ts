import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
export class CreateProgramDto {
  @ApiProperty()
  @IsString()
  "name": "string"

  @ApiProperty()
  @IsString()
  "award": "string"

  @ApiProperty()
  @IsString()
  "modularity": "string"

  @ApiProperty()
  @IsString()
  "minSize": 0

  @ApiProperty()
  @IsString()
  "duration": 0

  @ApiProperty()
  @IsString()
  "description": "string"

  @ApiProperty()
  @IsString()
  "timesOffered": 0

  @ApiProperty()
  @IsString()
  "units": "string"

  @ApiProperty()
  @IsString()
  "programTuition": 0
}