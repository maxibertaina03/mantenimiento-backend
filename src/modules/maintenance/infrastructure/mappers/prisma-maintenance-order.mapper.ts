import { MaintenanceOrder as PrismaMaintenanceOrder, MaintenanceType, MaintenanceStatus, MaintenanceLocation } from '@prisma/client';
import { MaintenanceOrder } from '../../domain/entities/maintenance-order.entity';

export class PrismaMaintenanceOrderMapper {
  static toDomain(raw: PrismaMaintenanceOrder): MaintenanceOrder {
    return new MaintenanceOrder(
      raw.id,
      raw.machineId,
      raw.type as any,
      raw.status as any,
      raw.location as any,
      raw.externalLocation || null,
      raw.scheduledFor,
      raw.startedAt,
      raw.completedAt,
      raw.machineHoursSnapshot,
      raw.technicianId,
      raw.providerId,
      raw.cost,
      (raw.currency as string | undefined) || 'USD',
      raw.description,
      raw.observations,
      raw.tenantId,
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
    );
  }

  static toPersistence(order: MaintenanceOrder): Omit<PrismaMaintenanceOrder, 'createdAt' | 'updatedAt' | 'deletedAt'> {
    return {
      id: order.getId(),
      machineId: order.getMachineId(),
      type: order.getType() as MaintenanceType,
      status: order.getStatus() as MaintenanceStatus,
      location: order.getLocation() as MaintenanceLocation,
      externalLocation: order.getExternalLocation(),
      scheduledFor: order.getScheduledFor(),
      startedAt: order.getStartedAt(),
      completedAt: order.getCompletedAt(),
      machineHoursSnapshot: order.getMachineHoursSnapshot(),
      technicianId: order.getTechnicianId(),
      providerId: order.getProviderId(),
      cost: order.getCost(),
      currency: order.getCurrency(),
      description: order.getDescription(),
      observations: order.getObservations(),
      tenantId: order.getTenantId(),
    };
  }
}
