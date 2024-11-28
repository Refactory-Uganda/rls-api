"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const authentication_controller_1 = require("./authentication.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("../prisma/prisma.module");
const axios_1 = require("@nestjs/axios");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const config_1 = require("@nestjs/config");
let AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule;
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { issuer: 'rls-api' },
                }),
                inject: [config_1.ConfigService],
            }),
            axios_1.HttpModule,
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [authentication_service_1.AuthenticationService, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGaurd],
        exports: [authentication_service_1.AuthenticationService],
    })
], AuthenticationModule);
//# sourceMappingURL=authentication.module.js.map