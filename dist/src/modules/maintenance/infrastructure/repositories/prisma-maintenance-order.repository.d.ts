import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
import { IMaintenanceOrderRepository } from '../../domain/repositories/maintenance-order.repository';
export declare class PrismaMaintenanceOrderRepository implements IMaintenanceOrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(order: MaintenanceOrder): Promise<void>;
    findById(id: string): Promise<MaintenanceOrder | null>;
    findByMachineId(machineId: string): Promise<MaintenanceOrder[]>;
    findAll(tenantId?: string | null): Promise<MaintenanceOrder[]>;
    delete(id: string): Promise<void>;
}
