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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("@nestjs/axios");
const axios_2 = require("axios");
let AuthenticationService = class AuthenticationService {
    constructor(prisma, jwtService, httpService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.httpService = httpService;
        this.urlAdmin = "https://rims-api-xufp.onrender.com/accounts/admin/login";
        this.urlStaff = "https://rims-api-xufp.onrender.com/accounts/staff/login";
        this.urlStudent = "https://rims-api-xufp.onrender.com/accounts/student/login";
        this.urlUser = "https://rims-api-xufp.onrender.com/accounts/users/login";
    }
    async login(dto) {
        const endpoints = {
            admin: "https://rims-api-xufp.onrender.com/accounts/admin/login",
            staff: "https://rims-api-xufp.onrender.com/accounts/staff/login",
            student: "https://rims-api-xufp.onrender.com/accounts/student/login",
            user: "https://rims-api-xufp.onrender.com/accounts/users/login"
        };
        try {
            console.log('Starting');
            console.log(`starting ${dto.userGroup} login`);
            console.log('Login DTO:', dto);
            let targetUrl;
            switch (dto.userGroup) {
                case 'Administrator':
                    targetUrl = endpoints.admin;
                    break;
                case 'Staff':
                    targetUrl = endpoints.staff;
                    break;
                case 'Student':
                    targetUrl = endpoints.student;
                    break;
                case 'User':
                    targetUrl = endpoints.user;
                    break;
                default:
                    throw new common_1.HttpException('Invalid user group', common_1.HttpStatus.BAD_REQUEST);
            }
            const response = await axios_2.default.post(targetUrl, {
                email: dto.email,
                password: dto.password
            });
            const { user: externalUser, tokens } = response.data;
            if (!externalUser || !tokens) {
                throw new common_1.HttpException('Invalid response from external API', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.log('Received response from API:', externalUser);
            let user = await this.prisma.user.findUnique({
                where: {
                    email: externalUser.email.email
                }
            });
            const userData = {
                externalId: externalUser.id,
                email: externalUser.email.email,
                firstName: externalUser.firstName,
                lastName: externalUser.lastName,
                userGroup: dto.userGroup,
                nationality: externalUser.nationality,
                residence: externalUser.residence,
            };
            if (!user) {
                console.log('creating new user');
                user = await this.prisma.user.create({
                    data: userData,
                });
            }
            else {
                console.log('updating existing user');
                user = await this.prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: userData,
                });
            }
            const payload = {
                sub: user.id,
                email: user.email,
                userGroup: user.userGroup
            };
            const access_token = this.jwtService.sign(payload, {
                expiresIn: '15m'
            });
            const refresh_token = this.jwtService.sign(payload, {
                expiresIn: '7d'
            });
            await this.prisma.user.update({
                where: { id: user.id },
                data: { refresh_token }
            });
            return {
                message: 'Login Successfully to RLS',
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userGroup: user.userGroup,
                },
                tokens: {
                    access_token,
                    refresh_token
                }
            };
        }
        catch (error) {
            if (axios_2.default.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
                throw new common_1.UnauthorizedException('Illegal Alien');
            }
            else {
                console.error('Unexpected error:', error);
                throw new common_1.HttpException('something isnot right', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async refreshToken(refreshToken) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { refresh_token: refreshToken.refresh_token },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            try {
                const decoded = this.jwtService.verify(refreshToken.refresh_token);
                console.log('Decoded refresh token:', decoded);
            }
            catch (error) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { refresh_token: null }
                });
                console.error(error);
                throw new common_1.UnauthorizedException('Expired refresh token');
            }
            const payload = {
                sub: user.id,
                email: user.email,
                userGroup: user.userGroup
            };
            const access_token = this.jwtService.sign(payload, {
                expiresIn: '15m'
            });
            const new_refresh_token = this.jwtService.sign(payload, {
                expiresIn: '7d'
            });
            await this.prisma.user.update({
                where: { id: user.id },
                data: { refresh_token: new_refresh_token }
            });
            return {
                access_token,
                refresh_token: new_refresh_token
            };
        }
        catch (error) {
            if (axios_2.default.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            else {
                console.error('Unexpected error:', error);
                throw new common_1.HttpException('something isnot right', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map