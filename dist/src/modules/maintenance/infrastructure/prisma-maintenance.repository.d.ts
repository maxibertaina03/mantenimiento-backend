import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { CreateMaintenanceProps, ListMaintenanceQuery, MaintenanceRepository } from '../domain/maintenance.repository';
export declare class PrismaMaintenanceRepository implements MaintenanceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(props: CreateMaintenanceProps): Promise<MaintenanceOrder>;
    findById(id: string): Promise<MaintenanceOrder | null>;
    list(query: ListMaintenanceQuery): Promise<{
        items: MaintenanceOrder[];
        total: number;
    }>;
    save(order: MaintenanceOrder): Promise<MaintenanceOrder>;
    softDelete(id: string): Promise<void>;
    countPending(tenantId?: string | null): Promise<number>;
    private toDomain;
}
