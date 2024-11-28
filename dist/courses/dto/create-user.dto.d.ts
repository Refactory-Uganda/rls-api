import { Groups } from "@prisma/client";
export declare class CreateUserDto {
    externalId: string;
    email: string;
    firstName: string;
    lastName: string;
    userGroup: Groups;
    nationality?: string;
    residence?: string;
    refresh_token?: string;
}
