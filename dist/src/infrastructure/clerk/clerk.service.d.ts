import { ConfigService } from '@nestjs/config';
export interface ClerkSession {
    userId: string;
    sessionId: string;
}
export interface ClerkUserSnapshot {
    id: string;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
}
export declare class ClerkService {
    private readonly client;
    private readonly secretKey;
    private readonly issuer?;
    constructor(cs: ConfigService);
    verifyToken(token: string): Promise<ClerkSession>;
    getUser(clerkUserId: string): Promise<ClerkUserSnapshot>;
}
