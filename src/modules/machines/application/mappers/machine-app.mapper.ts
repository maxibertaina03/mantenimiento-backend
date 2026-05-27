import { Machine } from '../../domain/entities/machine.entity';
import { CreateMachineOutput } from '../dtos/create-machine.output';

export class MachineAppMapper {
  static toOutput(machine: Machine): CreateMachineOutput {
    return {
      id: machine.getId(),
      code: machine.getCode(),
      name: machine.getName(),
      brand: machine.getBrand(),
      model: machine.getModel(),
      serialNumber: machine.getSerialNumber(),
      status: machine.getStatus(),
      usageHours: machine.getUsageHours(),
      location: machine.getLocation(),
      responsibleId: machine.getResponsibleId(),
      notes: machine.getNotes(),
      preventiveIntervalHours: machine.getPreventiveIntervalHours(),
      lastPreventiveAtHours: machine.getLastPreventiveAtHours(),
      createdAt: machine.getCreatedAt(),
    };
  }
}
