import { Machine } from '../../domain/entities/machine.entity';
import { CreateMachineOutput } from '../dtos/create-machine.output';
import { MachineListItemDto } from '../dtos/list-machines.output';

export class MachineAppMapper {
  static toOutput(machine: Machine): CreateMachineOutput {
    return {
      id: machine.getId(),
      code: machine.getCode(),
      name: machine.getName(),
      status: machine.getStatus(),
      brand: machine.getBrand(),
      model: machine.getModel(),
      serialNumber: machine.getSerialNumber(),
      usageHours: machine.getUsageHours(),
      location: machine.getLocation(),
      responsibleId: machine.getResponsibleId(),
      notes: machine.getNotes(),
      preventiveIntervalHours: machine.getPreventiveIntervalHours(),
      lastPreventiveAtHours: machine.getLastPreventiveAtHours(),
      createdAt: machine.getCreatedAt(),
    };
  }

  static toListItem(machine: Machine): MachineListItemDto {
    return {
      id: machine.getId(),
      code: machine.getCode(),
      name: machine.getName(),
      status: machine.getStatus(),
      usageHours: machine.getUsageHours(),
      location: machine.getLocation(),
      brand: machine.getBrand(),
    };
  }
}
