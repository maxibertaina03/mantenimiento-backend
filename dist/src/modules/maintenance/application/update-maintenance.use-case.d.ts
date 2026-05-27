import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type MaintenanceRepository } from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { UpdateMaintenanceInput } from './dto/maintenance-input';
export declare class UpdateMaintenanceUseCase {
    private readonly orders;
    private readonly audit;
    constructor(orders: MaintenanceRepository, audit: AuditWriter);
    execute(id: string, input: UpdateMaintenanceInput, actorId: string, tenantId: string | null): Promise<MaintenanceOrder>;
}
