import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';

import { ScheduleMaintenanceUseCase } from '../application/schedule-maintenance.use-case';
import { StartMaintenanceUseCase } from '../application/start-maintenance.use-case';
import { CompleteMaintenanceUseCase } from '../application/complete-maintenance.use-case';
import { CancelMaintenanceUseCase } from '../application/cancel-maintenance.use-case';
import { UpdateMaintenanceUseCase } from '../application/update-maintenance.use-case';
import { ListMaintenanceUseCase } from '../application/list-maintenance.use-case';
import { GetMaintenanceUseCase } from '../application/get-maintenance.use-case';

import {
  CancelMaintenanceDto,
  CompleteMaintenanceDto,
  ListMaintenanceQueryDto,
  ScheduleMaintenanceDto,
  UpdateMaintenanceDto,
} from './maintenance-request.dto';
import {
  MaintenanceResponseDto,
  PaginatedMaintenanceResponseDto,
} from './maintenance-response.dto';

@ApiTags('maintenance')
@ApiBearerAuth('clerk')
@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
  constructor(
    private readonly scheduleUC: ScheduleMaintenanceUseCase,
    private readonly startUC: StartMaintenanceUseCase,
    private readonly completeUC: CompleteMaintenanceUseCase,
    private readonly cancelUC: CancelMaintenanceUseCase,
    private readonly updateUC: UpdateMaintenanceUseCase,
    private readonly listUC: ListMaintenanceUseCase,
    private readonly getUC: GetMaintenanceUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedMaintenanceResponseDto })
  async list(
    @Query() query: ListMaintenanceQueryDto,
  ): Promise<PaginatedMaintenanceResponseDto> {
    const result = await this.listUC.execute(query);
    return {
      items: result.items.map(MaintenanceResponseDto.from),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: MaintenanceResponseDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<MaintenanceResponseDto> {
    return MaintenanceResponseDto.from(await this.getUC.execute(id));
  }

  @Post()
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async schedule(
    @Body() dto: ScheduleMaintenanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaintenanceResponseDto> {
    const order = await this.scheduleUC.execute(dto, user.id, user.tenantId);
    return MaintenanceResponseDto.from(order);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMaintenanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaintenanceResponseDto> {
    const order = await this.updateUC.execute(id, dto, user.id, user.tenantId);
    return MaintenanceResponseDto.from(order);
  }

  @Post(':id/start')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async start(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaintenanceResponseDto> {
    const order = await this.startUC.execute(id, user.id, user.tenantId);
    return MaintenanceResponseDto.from(order);
  }

  @Post(':id/complete')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async complete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CompleteMaintenanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaintenanceResponseDto> {
    const order = await this.completeUC.execute(id, dto, user.id, user.tenantId);
    return MaintenanceResponseDto.from(order);
  }

  @Post(':id/cancel')
  @Roles('ADMIN', 'SUPERVISOR')
  async cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CancelMaintenanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaintenanceResponseDto> {
    const order = await this.cancelUC.execute(id, dto, user.id, user.tenantId);
    return MaintenanceResponseDto.from(order);
  }

}
