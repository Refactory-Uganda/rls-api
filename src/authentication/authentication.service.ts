/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from 'src/prisma/prisma.service';
// // import * as bcrypt from 'bcrypt';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs';

// @Injectable()
// export class AuthenticationService {
//     constructor(
//         private readonly prisma: PrismaService,
//         private readonly jwtService: JwtService,
//         private readonly httpService: HttpService,
//     ) { }

//     private readonly loginEndpoints = {
//         admin: "https://rims-api-xufp.onrender.com/accounts/admin/login",
//         staff: "https://rims-api-xufp.onrender.com/accounts/staff/login",
//         student: "https://rims-api-xufp.onrender.com/accounts/student/login",
//         user: "https://rims-api-xufp.onrender.com/accounts/users/login"
//     }

//     // loginUser = "https://rims-api-xufp.onrender.com/accounts/users/login"

//     async validateUser(email: string, pass: string): Promise<any> {
//         const loginUrl = this.loginEndpoints[email];
//         if (!loginUrl) {
//             return null;
//         }

//         try {
//         const response = await lastValueFrom(this.httpService.post(loginUrl, { email, password: pass }));
//         const user = response.data;
//         if (user) {
//             return user;
//         }
//         return null;
//     }catch (error) {
//         console.error('Error during user validation:', error);
//         if (error.response) {
//             console.error('Response data:', error.response.data);
//             console.error('Response status:', error.response.status);
//             console.error('Response headers:', error.response.headers);
//         }
//         throw new Error('User validation Failed');
//     }
// }

//     async login(user: any) {
//         const payload = { email: user.email, sub: user.id, role: user.role }
//         return {
//             access_token: this.jwtService.sign(payload)
//         };
//     }

// }


import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    nationality: string;
    residence: string;
    DOB: Date | null;
    isVerified: boolean;
    userGroup: string;
    emailID: string;
    email: {
        id: string;
        email: string;
    };
}

@Injectable()
export class AuthenticationService {
    private readonly loginEndpoints = {
        admin: "https://rims-api-xufp.onrender.com/accounts/admin/login",
        staff: "https://rims-api-xufp.onrender.com/accounts/staff/login",
        student: "https://rims-api-xufp.onrender.com/accounts/student/login",
        user: "https://rims-api-xufp.onrender.com/accounts/users/login",
    };

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const loginUrl = this.loginEndpoints[email];

        if (!loginUrl) {
            throw new NotFoundException('Login endpoint not found for this user type');
        }

        try {
            const response = await lastValueFrom(this.httpService.post(loginUrl, { email, password }));
            const user: User = response.data.user;

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return user;
        } catch (error) {
            console.error('Error during user validation:', error);
            throw new UnauthorizedException('User validation failed');
        }
    }

    async login(user: User) {
        const payload = { email: user.email.email, sub: user.id, role: user.userGroup }; // Adjust the role if necessary
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' }); // Example for a refresh token

        return {
            message: "Login successful",
            success: true,
            token: access_token,
            user,
            tokens: {
                access_token,
                refresh_token,
            },
        };
    }
}
