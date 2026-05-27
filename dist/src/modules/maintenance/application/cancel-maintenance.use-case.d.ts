import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { MachinePublicService } from '@/modules/machines/application/machine-public.service';
import { type MaintenanceRepository } from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
import type { CancelMaintenanceInput } from './dto/maintenance-input';
export declare class CancelMaintenanceUseCase {
    private readonly orders;
    private readonly machines;
    private readonly audit;
    constructor(orders: MaintenanceRepository, machines: MachinePublicService, audit: AuditWriter);
    execute(id: string, input: CancelMaintenanceInput, actorId: string, tenantId: string | null): Promise<MaintenanceOrder>;
}
