import { MaintenanceOrder as PrismaMaintenanceOrder } from '@prisma/client';
import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
export declare class PrismaMaintenanceOrderMapper {
    static toDomain(raw: PrismaMaintenanceOrder): MaintenanceOrder;
    static toPersistence(order: MaintenanceOrder): Omit<PrismaMaintenanceOrder, 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
