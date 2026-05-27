import { type MaintenanceRepository } from '../domain/maintenance.repository';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';
export declare class GetMaintenanceUseCase {
    private readonly orders;
    constructor(orders: MaintenanceRepository);
    execute(id: string): Promise<MaintenanceOrder>;
}
