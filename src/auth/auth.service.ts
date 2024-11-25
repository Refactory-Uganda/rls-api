/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { console } from 'inspector';

@Injectable()
export class AuthService {
    private apiUrl = 'https://rims-api-xufp.onrender.com/accounts/staff/login';
    
    constructor(
        private jwtService: JwtService,
    ) { }

    // Function to create JWT Token
    createAccessToken(id: string): { accessToken: string } {
        return { accessToken: this.jwtService.sign({ id }) };
    }

    // Function to validate JWT Token
    validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET_KEY,
        });
    }

  // ADMIN LOGIN

        private apiUrl1 = 'https://rims-api-xufp.onrender.com/accounts/admin/login';
    
        async adminlogin(credentials: { email: string; password: string }): Promise<any> {
            try {
                console.log('Sending login request with credentials:', credentials);
    
                const response = await axios.post(this.apiUrl1, credentials, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const {user} = response.data
                console.log(user)
                const access_token = this.createAccessToken(user.id)
                      console.log(access_token)
                if (!response.data || !response.data.tokens) {
                    throw new HttpException('Login failed: invalid response from API', HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return response.data;
            } catch (error) {
                console.error('Login request failed:', error);
                throw error;
            }
        }

    // STAFF

    // Utility function to hash passwords
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // Utility function to compare plain password and hashed password
    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Login function
    async login(credentials: { email: string; password: string }): Promise<any> {
        try {
            console.log('Sending login request with credentials:', credentials);

            // Sending login request to the external API
            const response = await axios.post(this.apiUrl, credentials, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Ensure valid response from the external API
            if (!response.data || !response.data.tokens) {
                throw new HttpException('Login failed: invalid response from API', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const { user } = response.data;

            // Verify if passwords match (assuming the external API sends a hashed password)
            const passwordValid = await this.comparePassword(credentials.password, user.hashedPassword);
            if (!passwordValid) {
                throw new HttpException('Login failed: Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            // Generate access token for the user
            const access_token = this.createAccessToken(user.id);

            // Return user id and access token
            return {
                id: user.id,
                access_token: access_token.accessToken,
            };

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login failed:', error.response?.data || error.message);
                throw new HttpException(
                    `Login failed: ${error.response?.data || error.message}`,
                    error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                );
            } else {
                console.error('Login failed:', error.message);
                throw new HttpException(`Login failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // Forgot password function
    async forgotPassword(email: string): Promise<any> {
        try {
            console.log(`Sending forgot password request for email: ${email}`);

            const response = await axios.post('https://rims-api-xufp.onrender.com/auth/forgot-password', {
                email: email.trim(),
            });

            console.log('Response from external API:', response.data);
            return response.data;

        } catch (error) {
            console.error('Error sending forgot password request:', error.response?.data || error.message);
            throw new ForbiddenException('Unable to send password reset link');
        }
    }

    // Reset password function
    async resetPassword(token: string, newPassword: string): Promise<any> {
        try {
            console.log('Resetting password with token:', token);
            console.log('New password:', newPassword);

            // Hash the new password before sending it to the external API
            const hashedPassword = await this.hashPassword(newPassword);

            const response = await axios.post('https://rims-api-xufp.onrender.com/auth/password-reset', {
                token,
                password: hashedPassword,  // Send the hashed password to the external API
            });

            console.log('Response from external reset password API:', response.data);
            return response.data;

        } catch (error) {
            console.error('Reset Password Error:', error.response?.data || error.message);
            throw new ForbiddenException('Unable to reset password');
        }
    }
}
