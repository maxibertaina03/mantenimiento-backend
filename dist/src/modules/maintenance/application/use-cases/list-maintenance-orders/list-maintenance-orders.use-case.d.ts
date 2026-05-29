import { IMaintenanceOrderRepository } from '../../../domain/repositories/maintenance-order.repository';
import { ListMaintenanceOrdersInput } from '../../dtos/list-maintenance-orders.input';
import { ListMaintenanceOrdersOutput } from '../../dtos/list-maintenance-orders.output';
export declare class ListMaintenanceOrdersUseCase {
    private readonly repository;
    constructor(repository: IMaintenanceOrderRepository);
    execute(input: ListMaintenanceOrdersInput): Promise<ListMaintenanceOrdersOutput>;
}
