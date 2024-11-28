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
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            userGroup: any;
        };
        tokens: {
            access_token: any;
            refresh_token: any;
        };
    }>;
    refreshToken(dto: RefreshTokendto): Promise<{
        access_token: any;
        refresh_token: any;
    }>;
}
