import { IMaintenanceOrderRepository } from '../../../domain/repositories/maintenance-order.repository';
import { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';
export declare class CompleteMaintenanceOrderUseCase {
    private readonly repository;
    constructor(repository: IMaintenanceOrderRepository);
    execute(id: string): Promise<CreateMaintenanceOrderOutput>;
}
