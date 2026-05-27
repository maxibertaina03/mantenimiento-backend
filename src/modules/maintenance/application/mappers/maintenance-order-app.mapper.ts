import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
import { CreateMaintenanceOrderOutput } from '../dtos/create-maintenance-order.output';
export class MaintenanceOrderAppMapper {
  static toOutput(order: MaintenanceOrder): CreateMaintenanceOrderOutput {
    return {
      id: order.getId(),
      machineId: order.getMachineId(),
      type: order.getType(),
      status: order.getStatus(),
      location: order.getLocation(),
      cost: order.getCost(),
      createdAt: order.getCreatedAt(),
    };
  }
}
