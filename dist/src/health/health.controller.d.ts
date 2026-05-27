import { HealthCheckService } from '@nestjs/terminus';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
export declare class HealthController {
    private readonly health;
    private readonly prisma;
    constructor(health: HealthCheckService, prisma: PrismaService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
