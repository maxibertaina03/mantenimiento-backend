import { MaintenanceOrderResponseDto } from '../dtos/maintenance-order.response.dto';
import { CreateMaintenanceOrderOutput } from '../../application/dtos/create-maintenance-order.output';
export declare class MaintenanceOrderPresenterMapper {
    static toResponse(output: CreateMaintenanceOrderOutput): MaintenanceOrderResponseDto;
}
