import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/create-login.dto';
import { RefreshTokendto } from './dto/refresh-token.dto';
export declare class AuthenticationService {
    private readonly prisma;
    private readonly jwtService;
    private readonly httpService;
    constructor(prisma: PrismaService, jwtService: JwtService, httpService: HttpService);
    urlAdmin: string;
    urlStaff: string;
    urlStudent: string;
    urlUser: string;
    login(dto: LoginDto): Promise<{
        message: string;
        success: boolean;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            userGroup: import(".prisma/client").$Enums.Groups;
        };
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    refreshToken(refreshToken: RefreshTokendto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
