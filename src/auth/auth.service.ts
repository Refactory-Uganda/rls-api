import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  // constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      // Call the external login API
      const response = await axios.post('https://rims-api-xufp.onrender.com/accounts/staff/login', {
        email: email,
        password: pass
      });

      console.log('Response from external login API:', response.data); 

      // Check if login was successful
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
    // const payload = { userId: userData.user.id, email: userData.user.email }; 
    return {
      user: userData.user,
      tokens: {
        access_token: userData.access_token,
        refresh_token: userData.refresh_token, 
      }
    };
  }
}
