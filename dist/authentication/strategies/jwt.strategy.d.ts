import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
        userGroup: any;
    }>;
}
export {};
