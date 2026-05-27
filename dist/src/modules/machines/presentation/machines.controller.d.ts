import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { RegisterMachineUseCase } from '../application/register-machine.use-case';
import { UpdateMachineUseCase } from '../application/update-machine.use-case';
import { ChangeMachineStatusUseCase } from '../application/change-machine-status.use-case';
import { LogMachineHoursUseCase } from '../application/log-machine-hours.use-case';
import { ListMachinesUseCase } from '../application/list-machines.use-case';
import { GetMachineUseCase } from '../application/get-machine.use-case';
import { DeleteMachineUseCase } from '../application/delete-machine.use-case';
import { GetPreventiveAlertsUseCase } from '../application/get-preventive-alerts.use-case';
import { ListUsageLogsUseCase } from '../application/list-usage-logs.use-case';
import { ChangeMachineStatusDto, CreateMachineDto, ListMachinesQueryDto, LogMachineHoursDto, UpdateMachineDto } from './machine-request.dto';
import { MachineResponseDto, PaginatedMachineResponseDto, PreventiveAlertDto } from './machine-response.dto';
import { UsageLogResponseDto } from './usage-log-response.dto';
export declare class MachinesController {
    private readonly registerUC;
    private readonly updateUC;
    private readonly changeStatusUC;
    private readonly logHoursUC;
    private readonly listUC;
    private readonly getUC;
    private readonly deleteUC;
    private readonly preventiveUC;
    private readonly listUsageUC;
    constructor(registerUC: RegisterMachineUseCase, updateUC: UpdateMachineUseCase, changeStatusUC: ChangeMachineStatusUseCase, logHoursUC: LogMachineHoursUseCase, listUC: ListMachinesUseCase, getUC: GetMachineUseCase, deleteUC: DeleteMachineUseCase, preventiveUC: GetPreventiveAlertsUseCase, listUsageUC: ListUsageLogsUseCase);
    list(query: ListMachinesQueryDto): Promise<PaginatedMachineResponseDto>;
    preventiveAlerts(user: AuthenticatedUser): Promise<PreventiveAlertDto[]>;
    get(id: string): Promise<MachineResponseDto>;
    usageLogs(id: string, page?: number, pageSize?: number): Promise<UsageLogResponseDto[]>;
    create(dto: CreateMachineDto, user: AuthenticatedUser): Promise<MachineResponseDto>;
    update(id: string, dto: UpdateMachineDto, user: AuthenticatedUser): Promise<MachineResponseDto>;
    changeStatus(id: string, dto: ChangeMachineStatusDto, user: AuthenticatedUser): Promise<MachineResponseDto>;
    logHours(id: string, dto: LogMachineHoursDto, user: AuthenticatedUser): Promise<{
        machine: MachineResponseDto;
        log: UsageLogResponseDto;
    }>;
    remove(id: string, user: AuthenticatedUser): Promise<void>;
}
