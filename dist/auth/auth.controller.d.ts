import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentials: {
        email: string;
        password: string;
    }): Promise<any>;
    adminlogin(credentials: {
        email: string;
        password: string;
    }): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    resetPassword(token: string, newPassword: string): Promise<any>;
}
