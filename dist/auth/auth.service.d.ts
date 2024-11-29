import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private apiUrl;
    constructor(jwtService: JwtService);
    createAccessToken(id: string): {
        accessToken: string;
    };
    validateToken(token: string): any;
    private apiUrl1;
    adminlogin(credentials: {
        email: string;
        password: string;
    }): Promise<any>;
    hashPassword(password: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    login(credentials: {
        email: string;
        password: string;
    }): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    resetPassword(token: string, newPassword: string): Promise<any>;
}
