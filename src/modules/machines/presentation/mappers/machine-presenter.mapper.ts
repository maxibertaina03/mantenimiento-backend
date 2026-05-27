import { CreateMachineOutput } from '../../application/dtos/create-machine.output';
import { MachineResponseDto } from '../dtos/machine.response.dto';

export class MachinePresenterMapper {
  static toResponse(output: CreateMachineOutput): MachineResponseDto {
    return {
      id: output.id,
      code: output.code,
      name: output.name,
      brand: output.brand,
      model: output.model,
      serialNumber: output.serialNumber,
      status: output.status,
      usageHours: output.usageHours,
      location: output.location,
      responsibleId: output.responsibleId,
      notes: output.notes,
      preventiveIntervalHours: output.preventiveIntervalHours,
      lastPreventiveAtHours: output.lastPreventiveAtHours,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }
}
