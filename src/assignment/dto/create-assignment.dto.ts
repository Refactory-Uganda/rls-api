// create-assignment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional, IsString, Max, Min, validate, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

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

@ValidatorConstraint({ name: 'isValidFileType', async: false })
export class IsValidFileType implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File): boolean {
    if(!file) return true;

    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return file.mimetype ? allowedMimeTypes.includes(file.mimetype) : false;
  }
  defaultMessage(): string {
    return 'Only pdf or word docs allowed';
  
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
  @Validate(IsValidFileType, {
    message: 'Only pdfs or word docs allowed'
  })
  uploadQuestion?: Express.Multer.File; // Optional file upload link (could be the file URL or path)

  @ApiProperty()
  @IsString()
  lessonId: string; // IDs of lessons to which the assignment is related

}
