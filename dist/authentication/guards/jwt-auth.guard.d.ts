declare const JwtAuthGaurd_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGaurd extends JwtAuthGaurd_base {
    handleRequest(err: any, user: any, info: any): any;
}
export {};
