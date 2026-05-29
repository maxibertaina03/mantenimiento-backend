import { IMaintenanceOrderRepository } from '../../../domain/repositories/maintenance-order.repository';
export declare class DeleteMaintenanceOrderUseCase {
    private readonly repository;
    constructor(repository: IMaintenanceOrderRepository);
    execute(id: string): Promise<void>;
}
