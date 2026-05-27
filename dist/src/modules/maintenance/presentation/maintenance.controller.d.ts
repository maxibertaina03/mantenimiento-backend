import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { ScheduleMaintenanceUseCase } from '../application/schedule-maintenance.use-case';
import { StartMaintenanceUseCase } from '../application/start-maintenance.use-case';
import { CompleteMaintenanceUseCase } from '../application/complete-maintenance.use-case';
import { CancelMaintenanceUseCase } from '../application/cancel-maintenance.use-case';
import { UpdateMaintenanceUseCase } from '../application/update-maintenance.use-case';
import { ListMaintenanceUseCase } from '../application/list-maintenance.use-case';
import { GetMaintenanceUseCase } from '../application/get-maintenance.use-case';
import { CancelMaintenanceDto, CompleteMaintenanceDto, ListMaintenanceQueryDto, ScheduleMaintenanceDto, UpdateMaintenanceDto } from './maintenance-request.dto';
import { MaintenanceResponseDto, PaginatedMaintenanceResponseDto } from './maintenance-response.dto';
export declare class MaintenanceController {
    private readonly scheduleUC;
    private readonly startUC;
    private readonly completeUC;
    private readonly cancelUC;
    private readonly updateUC;
    private readonly listUC;
    private readonly getUC;
    constructor(scheduleUC: ScheduleMaintenanceUseCase, startUC: StartMaintenanceUseCase, completeUC: CompleteMaintenanceUseCase, cancelUC: CancelMaintenanceUseCase, updateUC: UpdateMaintenanceUseCase, listUC: ListMaintenanceUseCase, getUC: GetMaintenanceUseCase);
    list(query: ListMaintenanceQueryDto): Promise<PaginatedMaintenanceResponseDto>;
    get(id: string): Promise<MaintenanceResponseDto>;
    schedule(dto: ScheduleMaintenanceDto, user: AuthenticatedUser): Promise<MaintenanceResponseDto>;
    update(id: string, dto: UpdateMaintenanceDto, user: AuthenticatedUser): Promise<MaintenanceResponseDto>;
    start(id: string, user: AuthenticatedUser): Promise<MaintenanceResponseDto>;
    complete(id: string, dto: CompleteMaintenanceDto, user: AuthenticatedUser): Promise<MaintenanceResponseDto>;
    cancel(id: string, dto: CancelMaintenanceDto, user: AuthenticatedUser): Promise<MaintenanceResponseDto>;
}
