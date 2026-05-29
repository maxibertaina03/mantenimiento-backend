import { MaintenanceOrderResponseDto } from '../dtos/maintenance-order.response.dto';
import { CreateMaintenanceOrderOutput } from '../../application/dtos/create-maintenance-order.output';

export class MaintenanceOrderPresenterMapper {
  static toResponse(output: CreateMaintenanceOrderOutput): MaintenanceOrderResponseDto {
    return {
      id: output.id,
      machineId: output.machineId,
      type: output.type,
      status: output.status,
      location: output.location,
      cost: output.cost,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }
}
