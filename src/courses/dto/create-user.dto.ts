import { Groups } from '@prisma/client';

export class CreateUserDto {
  externalId: string; // ID from RIMS
  email: string;
  firstName: string;
  lastName: string;
  userGroup: Groups;
  nationality?: string;
  residence?: string;
  refresh_token?: string;
}
