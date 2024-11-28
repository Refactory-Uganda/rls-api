import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/create-login.dto';
import { RefreshTokendto } from './dto/refresh-token.dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
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
    refreshToken(dto: RefreshTokendto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
