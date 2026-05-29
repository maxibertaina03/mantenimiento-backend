import { IMaintenanceOrderRepository } from '../../../domain/repositories/maintenance-order.repository';
import { CreateMaintenanceOrderInput } from '../../dtos/create-maintenance-order.input';
import { CreateMaintenanceOrderOutput } from '../../dtos/create-maintenance-order.output';
export declare class CreateMaintenanceOrderUseCase {
    private readonly repository;
    constructor(repository: IMaintenanceOrderRepository);
    execute(input: CreateMaintenanceOrderInput): Promise<CreateMaintenanceOrderOutput>;
}
