import { IMaintenanceOrderRepository } from '../../../domain/repositories/maintenance-order.repository';
import { ListMaintenanceOrdersInput } from '../../dtos/list-maintenance-orders.input';
import type { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';
export interface ListMaintenanceOrdersOutput {
    items: CreateMaintenanceOrderOutput[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListMaintenanceOrdersUseCase {
    private readonly repository;
    constructor(repository: IMaintenanceOrderRepository);
    execute(input: ListMaintenanceOrdersInput): Promise<ListMaintenanceOrdersOutput>;
}
