import { Decimal } from '@prisma/client/runtime/library';
import { CreateMaintenanceOrderUseCase } from '../../application/use-cases/create-maintenance-order/create-maintenance-order.use-case';
import { ListMaintenanceOrdersUseCase } from '../../application/use-cases/list-maintenance-orders/list-maintenance-orders.use-case';
import { GetMaintenanceOrderUseCase } from '../../application/use-cases/get-maintenance-order/get-maintenance-order.use-case';
import { StartMaintenanceOrderUseCase } from '../../application/use-cases/start-maintenance-order/start-maintenance-order.use-case';
import { CompleteMaintenanceOrderUseCase } from '../../application/use-cases/complete-maintenance-order/complete-maintenance-order.use-case';
import { DeleteMaintenanceOrderUseCase } from '../../application/use-cases/delete-maintenance-order/delete-maintenance-order.use-case';
import { CreateMaintenanceOrderRequestDto } from '../dtos/create-maintenance-order.request.dto';
import { MaintenanceOrderResponseDto } from '../dtos/maintenance-order.response.dto';
export declare class MaintenanceController {
    private readonly createOrder;
    private readonly listOrders;
    private readonly getOrder;
    private readonly startOrder;
    private readonly completeOrder;
    private readonly deleteOrder;
    constructor(createOrder: CreateMaintenanceOrderUseCase, listOrders: ListMaintenanceOrdersUseCase, getOrder: GetMaintenanceOrderUseCase, startOrder: StartMaintenanceOrderUseCase, completeOrder: CompleteMaintenanceOrderUseCase, deleteOrder: DeleteMaintenanceOrderUseCase);
    create(dto: CreateMaintenanceOrderRequestDto): Promise<MaintenanceOrderResponseDto>;
    list(tenantId: string, page?: number, pageSize?: number, _machineId?: string, _status?: string, _type?: string, _technicianId?: string, _providerId?: string, _scheduledFrom?: string, _scheduledTo?: string): Promise<{
        items: {
            id: string;
            machineId: string;
            type: import("../../domain/value-objects/maintenance-type.vo").MaintenanceType;
            status: import("../../domain/value-objects/maintenance-status.vo").MaintenanceStatus;
            location: import("../../domain/value-objects/maintenance-location.vo").MaintenanceLocation;
            externalLocation: string | null;
            scheduledFor: Date | null;
            startedAt: Date | null;
            completedAt: Date | null;
            technicianId: string | null;
            providerId: string | null;
            cost: Decimal | null;
            currency: string;
            description: string | null;
            observations: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    get(id: string): Promise<MaintenanceOrderResponseDto>;
    start(id: string): Promise<MaintenanceOrderResponseDto>;
    complete(id: string): Promise<MaintenanceOrderResponseDto>;
    delete(id: string): Promise<void>;
}
