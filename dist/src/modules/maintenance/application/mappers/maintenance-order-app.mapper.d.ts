import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
import { CreateMaintenanceOrderOutput } from '../dtos/create-maintenance-order.output';
import { MaintenanceOrderListItemDto } from '../dtos/list-maintenance-orders.output';
export declare class MaintenanceOrderAppMapper {
    static toOutput(order: MaintenanceOrder): CreateMaintenanceOrderOutput;
    static toListItem(order: MaintenanceOrder): MaintenanceOrderListItemDto;
}
