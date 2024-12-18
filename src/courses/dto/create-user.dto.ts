import { ApiProperty } from "@nestjs/swagger"
import { Groups } from "@prisma/client"

export class CreateUserDto {
  externalId: string  // ID from RIMS
  email:     string  
  firstName: string
  lastName: string
  userGroup: Groups
  nationality?: string
  residence?: string
  refresh_token?: string
}

// get-course-contents.dto.ts
export class GetCourseContentsDto {
  @ApiProperty()
  learnerId: string;
}
