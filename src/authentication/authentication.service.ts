/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/create-login.dto';
import axios from 'axios';
import { RefeshTokendto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
    private readonly loginEndpoints = {
        admin: "https://rims-api-xufp.onrender.com/accounts/admin/login",
        staff: "https://rims-api-xufp.onrender.com/accounts/staff/login",
        student: "https://rims-api-xufp.onrender.com/accounts/student/login",
        // user: "https://rims-api-xufp.onrender.com/accounts/users/login",
    };

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
    ) { }

    urlAdmin = "https://rims-api-xufp.onrender.com/accounts/staff/login"


    async login(dto: LoginDto) {
        try {
            console.log('Starting')
            const response = await axios.post(this.urlAdmin, {
                email: dto.email,
                password: dto.password
            });

            const { user: externalUser, tokens } = response.data;
            if (!externalUser || !tokens) {
                throw new HttpException('Invalid response from external API', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.log('Received response from API:', externalUser);

            // find user 
            let user = await this.prisma.user.findUnique({
                where: {
                    email: externalUser.email.email
                }
            });
            if (!user) {
                console.log('creating new user')
                user = await this.prisma.user.create({
                    data: {
                        externalId: externalUser.id,
                        email: externalUser.email.email,
                        firstName: externalUser.firstName,
                        lastName: externalUser.lastName,
                        userGroup: externalUser.userGroup,
                        nationality: externalUser.nationality,
                        residence: externalUser.residence,
                        refresh_token: externalUser.refresh_token
                    },
                });
            } else {
                console.log('updating existing user')
                // update user
                user = await this.prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        firstName: externalUser.firstName,
                        lastName: externalUser.lastName,
                        userGroup: externalUser.userGroup,
                        nationality: externalUser.nationality,
                        residence: externalUser.residence,
                        refresh_token: externalUser.refresh_token
                    },
                });
            }
            // Generate Jwt Token
            const payload = {
                sub: user.id,
                email: user.email,
                userGroup: user.userGroup
            };
            // console.log('Recieved response: ', response.data)
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
                    access_token: this.jwtService.sign(payload),
                    refresh_token: tokens.refresh_token
                }
            };

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
                throw new UnauthorizedException('Illegal Alien');
            } else {
                console.error('Unexpected error:', error);
                throw new HttpException('something isnot right', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async refreshToken(refreshToken: RefeshTokendto) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { refresh_token: refreshToken.refresh_token },
            });
            if (!user) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // verify refresh token with rims
            const response = await axios.post(this.urlAdmin, {
                refresh_token: refreshToken.refresh_token
            });

            const { tokens } = response.data;

            // update user
            await this.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    refresh_token: tokens.refresh_token
                }
            });

            const payload = {
                sub: user.id,
                email: user.email,
                userGroup: user.userGroup
            };

            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: tokens.refresh_token
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
                throw new UnauthorizedException('Invalid refresh token');
            } else {
                console.error('Unexpected error:', error);
                throw new HttpException('something isnot right', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
