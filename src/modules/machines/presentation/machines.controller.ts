import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { Audited } from '@/common/decorators/audited.decorator';

import { RegisterMachineUseCase } from '../application/register-machine.use-case';
import { UpdateMachineUseCase } from '../application/update-machine.use-case';
import { ChangeMachineStatusUseCase } from '../application/change-machine-status.use-case';
import { LogMachineHoursUseCase } from '../application/log-machine-hours.use-case';
import { ListMachinesUseCase } from '../application/list-machines.use-case';
import { GetMachineUseCase } from '../application/get-machine.use-case';
import { DeleteMachineUseCase } from '../application/delete-machine.use-case';
import { GetPreventiveAlertsUseCase } from '../application/get-preventive-alerts.use-case';
import { ListUsageLogsUseCase } from '../application/list-usage-logs.use-case';

import {
  ChangeMachineStatusDto,
  CreateMachineDto,
  ListMachinesQueryDto,
  LogMachineHoursDto,
  UpdateMachineDto,
} from './machine-request.dto';
import {
  MachineResponseDto,
  PaginatedMachineResponseDto,
  PreventiveAlertDto,
} from './machine-response.dto';
import { UsageLogResponseDto } from './usage-log-response.dto';

@ApiTags('machines')
@ApiBearerAuth('clerk')
@Controller({ path: 'machines', version: '1' })
export class MachinesController {
  constructor(
    private readonly registerUC: RegisterMachineUseCase,
    private readonly updateUC: UpdateMachineUseCase,
    private readonly changeStatusUC: ChangeMachineStatusUseCase,
    private readonly logHoursUC: LogMachineHoursUseCase,
    private readonly listUC: ListMachinesUseCase,
    private readonly getUC: GetMachineUseCase,
    private readonly deleteUC: DeleteMachineUseCase,
    private readonly preventiveUC: GetPreventiveAlertsUseCase,
    private readonly listUsageUC: ListUsageLogsUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedMachineResponseDto })
  async list(@Query() query: ListMachinesQueryDto): Promise<PaginatedMachineResponseDto> {
    const result = await this.listUC.execute(query);
    return {
      items: result.items.map(MachineResponseDto.from),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  @Get('preventive-alerts')
  @ApiOkResponse({ type: [PreventiveAlertDto] })
  async preventiveAlerts(@CurrentUser() user: AuthenticatedUser): Promise<PreventiveAlertDto[]> {
    const alerts = await this.preventiveUC.execute(user.tenantId);
    return alerts.map((a) => ({
      machine: MachineResponseDto.from(a.machine),
      overdueByHours: a.overdueByHours,
    }));
  }

  @Get(':id')
  @ApiOkResponse({ type: MachineResponseDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<MachineResponseDto> {
    return MachineResponseDto.from(await this.getUC.execute(id));
  }

  @Get(':id/usage-logs')
  @ApiOkResponse({ type: [UsageLogResponseDto] })
  async usageLogs(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<UsageLogResponseDto[]> {
    const logs = await this.listUsageUC.execute(id, page ? Number(page) : 1, pageSize ? Number(pageSize) : 20);
    return logs.map(UsageLogResponseDto.from);
  }

  @Post()
  @Roles('ADMIN', 'SUPERVISOR')
  @Audited({
    action: 'CREATE',
    entity: 'Machine',
    resolveEntityId: ({ result }) => (result as MachineResponseDto)?.id,
  })
  async create(
    @Body() dto: CreateMachineDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MachineResponseDto> {
    const machine = await this.registerUC.execute(dto, user.id, user.tenantId);
    return MachineResponseDto.from(machine);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERVISOR')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMachineDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MachineResponseDto> {
    const machine = await this.updateUC.execute(id, dto, user.id, user.tenantId);
    return MachineResponseDto.from(machine);
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ChangeMachineStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MachineResponseDto> {
    const machine = await this.changeStatusUC.execute(id, dto, user.id, user.tenantId);
    return MachineResponseDto.from(machine);
  }

  @Post(':id/usage-logs')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR')
  async logHours(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: LogMachineHoursDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ machine: MachineResponseDto; log: UsageLogResponseDto }> {
    const result = await this.logHoursUC.execute(id, dto, user.id, user.tenantId);
    return {
      machine: MachineResponseDto.from(result.machine),
      log: UsageLogResponseDto.from(result.log),
    };
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(204)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    await this.deleteUC.execute(id, user.id, user.tenantId);
  }
}
