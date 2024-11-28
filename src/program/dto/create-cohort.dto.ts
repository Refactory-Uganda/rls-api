import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
export class CreateCohortDto {
  @ApiProperty()
  @IsString()
  'name': 'string';

  @ApiProperty()
  @IsString()
  'number': 'string';

  @ApiProperty()
  @IsString()
  'status': 'string';

  @ApiProperty()
  @IsString()
  @IsString()
  'description': 'string';

  @ApiProperty()
  @IsDateString()
  'startDate': 'string';

  @ApiProperty()
  @IsDateString()
  'endDate': 'string';
}
