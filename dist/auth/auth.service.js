"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("axios");
const bcrypt = require("bcrypt");
const inspector_1 = require("inspector");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.apiUrl = 'https://rims-api-xufp.onrender.com/accounts/staff/login';
        this.apiUrl1 = 'https://rims-api-xufp.onrender.com/accounts/admin/login';
    }
    createAccessToken(id) {
        return { accessToken: this.jwtService.sign({ id }) };
    }
    validateToken(token) {
        return this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET_KEY,
        });
    }
    async adminlogin(credentials) {
        try {
            inspector_1.console.log('Sending login request with credentials:', credentials);
            const response = await axios_1.default.post(this.apiUrl1, credentials, {
                headers: { 'Content-Type': 'application/json' },
            });
            const { user } = response.data;
            inspector_1.console.log(user);
            const access_token = this.createAccessToken(user.id);
            inspector_1.console.log(access_token);
            if (!response.data || !response.data.tokens) {
                throw new common_1.HttpException('Login failed: invalid response from API', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return response.data;
        }
        catch (error) {
            inspector_1.console.error('Login request failed:', error);
            throw error;
        }
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
    async login(credentials) {
        try {
            inspector_1.console.log('Sending login request with credentials:', credentials);
            const response = await axios_1.default.post(this.apiUrl, credentials, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.data || !response.data.tokens) {
                throw new common_1.HttpException('Login failed: invalid response from API', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const { user } = response.data;
            const passwordValid = await this.comparePassword(credentials.password, user.hashedPassword);
            if (!passwordValid) {
                throw new common_1.HttpException('Login failed: Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            const access_token = this.createAccessToken(user.id);
            return {
                id: user.id,
                access_token: access_token.accessToken,
            };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                inspector_1.console.error('Login failed:', error.response?.data || error.message);
                throw new common_1.HttpException(`Login failed: ${error.response?.data || error.message}`, error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else {
                inspector_1.console.error('Login failed:', error.message);
                throw new common_1.HttpException(`Login failed: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async forgotPassword(email) {
        try {
            inspector_1.console.log(`Sending forgot password request for email: ${email}`);
            const response = await axios_1.default.post('https://rims-api-xufp.onrender.com/auth/forgot-password', {
                email: email.trim(),
            });
            inspector_1.console.log('Response from external API:', response.data);
            return response.data;
        }
        catch (error) {
            inspector_1.console.error('Error sending forgot password request:', error.response?.data || error.message);
            throw new common_1.ForbiddenException('Unable to send password reset link');
        }
    }
    async resetPassword(token, newPassword) {
        try {
            inspector_1.console.log('Resetting password with token:', token);
            inspector_1.console.log('New password:', newPassword);
            const hashedPassword = await this.hashPassword(newPassword);
            const response = await axios_1.default.post('https://rims-api-xufp.onrender.com/auth/password-reset', {
                token,
                password: hashedPassword,
            });
            inspector_1.console.log('Response from external reset password API:', response.data);
            return response.data;
        }
        catch (error) {
            inspector_1.console.error('Reset Password Error:', error.response?.data || error.message);
            throw new common_1.ForbiddenException('Unable to reset password');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map