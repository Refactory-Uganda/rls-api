import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const response = await axios.post('https://rims-api-xufp.onrender.com/accounts/staff/login', {
        email: email,
        password: pass
      });

      console.log('Response from external login API:', response.data); 

      if (response.data && response.data.tokens) {
        return {
          user: response.data.user,
          tokens: response.data.tokens
        };
      }
    } catch (error) {
      console.error('Error during user validation:', error.response?.data || error.message);
    }
    return null; 
  }

  login(userData: any) {
    return {
      user: userData.user,
      tokens: {
        access_token: userData.tokens.access_token,
        refresh_token: userData.tokens.refresh_token, 
      }
    };
  }

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
  
    async resetPassword(token: string, newPassword: string): Promise<any> {
      try {
        console.log('Resetting password with token:', token);
        console.log('New password:', newPassword);
  
        const response = await axios.post('https://rims-api-xufp.onrender.com/auth/password-reset', {
          token,
          password: newPassword,
        });
  
        console.log('Response from external reset password API:', response.data);
        return response.data;
  
      } catch (error) {
        console.error('Reset Password Error:', error.response?.data || error.message);
        throw new ForbiddenException('Unable to reset password');
      }
    }
  }
 