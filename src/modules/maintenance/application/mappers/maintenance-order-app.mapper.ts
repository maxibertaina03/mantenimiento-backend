import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';
import { CreateMaintenanceOrderOutput } from '../dtos/create-maintenance-order.output';
import { MaintenanceOrderListItemDto } from '../dtos/list-maintenance-orders.output';

export class MaintenanceOrderAppMapper {
  static toOutput(order: MaintenanceOrder): CreateMaintenanceOrderOutput {
    return {
      id: order.getId(),
      machineId: order.getMachineId(),
      type: order.getType(),
      status: order.getStatus(),
      location: order.getLocation(),
      externalLocation: order.getExternalLocation(),
      scheduledFor: order.getScheduledFor(),
      startedAt: order.getStartedAt(),
      completedAt: order.getCompletedAt(),
      technicianId: order.getTechnicianId(),
      providerId: order.getProviderId(),
      cost: order.getCost(),
      currency: order.getCurrency(),
      description: order.getDescription(),
      observations: order.getObservations(),
      createdAt: order.getCreatedAt(),
    };
  }

  static toListItem(order: MaintenanceOrder): MaintenanceOrderListItemDto {
    return {
      id: order.getId(),
      machineId: order.getMachineId(),
      type: order.getType(),
      status: order.getStatus(),
      location: order.getLocation(),
      scheduledFor: order.getScheduledFor(),
      startedAt: order.getStartedAt(),
      createdAt: order.getCreatedAt(),
    };
  }
}
