import { Machine as PrismaMachine, MachineStatus as PrismaMachineStatus } from '@prisma/client';
import { Machine } from '../../domain/entities/machine.entity';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class PrismaMachineMapper {
  static toDomain(raw: PrismaMachine): Machine {
    return new Machine(
      raw.id,
      raw.code,
      raw.name,
      raw.brand,
      raw.model,
      raw.serialNumber,
      raw.status as MachineStatus,
      raw.usageHours,
      raw.location,
      raw.responsibleId,
      raw.notes,
      raw.preventiveIntervalHours,
      raw.lastPreventiveAtHours,
      raw.tenantId,
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
    );
  }

  static toPersistence(machine: Machine): Omit<PrismaMachine, 'createdAt' | 'updatedAt' | 'deletedAt'> {
    return {
      id: machine.getId(),
      code: machine.getCode(),
      name: machine.getName(),
      brand: machine.getBrand(),
      model: machine.getModel(),
      serialNumber: machine.getSerialNumber(),
      status: machine.getStatus() as PrismaMachineStatus,
      usageHours: machine.getUsageHours(),
      location: machine.getLocation(),
      responsibleId: machine.getResponsibleId(),
      notes: machine.getNotes(),
      preventiveIntervalHours: machine.getPreventiveIntervalHours(),
      lastPreventiveAtHours: machine.getLastPreventiveAtHours(),
      tenantId: machine.getTenantId(),
    };
  }
}
