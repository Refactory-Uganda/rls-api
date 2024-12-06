// create-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional, IsString, Max, Min, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDate implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  defaultMessage(): string {
    return 'Invalid date format';
  }
}

export class CreateAssignmentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty()
  @Validate(IsValidDate, {
    message: 'Invalid date format'
  })
  @Transform(({ value }) => new Date(value))
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Max(100)
  @IsInt()
  @Transform(({ value}) => parseInt(value,10))
  points? : number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  uploadQuestion?: Express.Multer.File; // Optional file upload link (could be the file URL or path)

  @ApiProperty()
  @IsString()
  lessonId: string; // IDs of lessons to which the assignment is related

}
