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

import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';

import { RegisterProviderUseCase } from '../application/register-provider.use-case';
import { UpdateProviderUseCase } from '../application/update-provider.use-case';
import { ToggleActiveProviderUseCase } from '../application/toggle-active-provider.use-case';
import { ListProvidersUseCase } from '../application/list-providers.use-case';
import { GetProviderUseCase } from '../application/get-provider.use-case';

import {
  CreateProviderDto,
  ListProvidersQueryDto,
  ToggleActiveProviderDto,
  UpdateProviderDto,
} from './provider-request.dto';
import {
  PaginatedProviderResponseDto,
  ProviderResponseDto,
} from './provider-response.dto';
import { MaintenanceResponseDto } from '@/modules/maintenance/presentation/maintenance-response.dto';
import { MaintenanceOrder } from '@/modules/maintenance/domain/maintenance-order.entity';

@ApiTags('providers')
@ApiBearerAuth('clerk')
@Controller({ path: 'providers', version: '1' })
export class ProvidersController {
  constructor(
    private readonly registerUC: RegisterProviderUseCase,
    private readonly updateUC: UpdateProviderUseCase,
    private readonly toggleUC: ToggleActiveProviderUseCase,
    private readonly listUC: ListProvidersUseCase,
    private readonly getUC: GetProviderUseCase,
    private readonly prisma: PrismaService,
    private readonly audit: AuditWriter,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedProviderResponseDto })
  async list(@Query() q: ListProvidersQueryDto): Promise<PaginatedProviderResponseDto> {
    const r = await this.listUC.execute(q);
    return {
      items: r.items.map(ProviderResponseDto.from),
      total: r.total,
      page: r.page,
      pageSize: r.pageSize,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: ProviderResponseDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<ProviderResponseDto> {
    return ProviderResponseDto.from(await this.getUC.execute(id));
  }

  @Get(':id/history')
  @ApiOkResponse({ type: [MaintenanceResponseDto] })
  async history(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 50,
  ): Promise<MaintenanceResponseDto[]> {
    // Cross-context: el historial de trabajos de un proveedor son los Maintenance.
    // Consulta directa al modelo Prisma (no se duplica un repo de Maintenance acá).
    const provider = await this.getUC.execute(id).catch(() => null);
    if (!provider) throw new NotFoundError('Provider', id);
    const take = Math.min(100, Number(pageSize));
    const skip = (Math.max(1, Number(page)) - 1) * take;
    const rows = await this.prisma.maintenanceOrder.findMany({
      where: { providerId: id, deletedAt: null },
      orderBy: [{ scheduledFor: 'desc' }, { createdAt: 'desc' }],
      skip,
      take,
    });
    return rows.map((row) =>
      MaintenanceResponseDto.from(
        MaintenanceOrder.rehydrate({
          id: row.id,
          machineId: row.machineId,
          type: row.type,
          status: row.status,
          location: row.location,
          externalLocation: row.externalLocation,
          scheduledFor: row.scheduledFor,
          startedAt: row.startedAt,
          completedAt: row.completedAt,
          machineHoursSnapshot: row.machineHoursSnapshot,
          technicianId: row.technicianId,
          providerId: row.providerId,
          cost: row.cost,
          currency: row.currency,
          description: row.description,
          observations: row.observations,
          tenantId: row.tenantId,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        }),
      ),
    );
  }

  @Post()
  @Roles('ADMIN', 'SUPERVISOR')
  async create(
    @Body() dto: CreateProviderDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ProviderResponseDto> {
    return ProviderResponseDto.from(await this.registerUC.execute(dto, user.id, user.tenantId));
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERVISOR')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProviderDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ProviderResponseDto> {
    return ProviderResponseDto.from(
      await this.updateUC.execute(id, dto, user.id, user.tenantId),
    );
  }

  @Patch(':id/active')
  @Roles('ADMIN', 'SUPERVISOR')
  async toggle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ToggleActiveProviderDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ProviderResponseDto> {
    return ProviderResponseDto.from(
      await this.toggleUC.execute(id, dto.active, user.id, user.tenantId),
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(204)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    const provider = await this.getUC.execute(id);
    // Soft delete con auditoría — proveedores casi nunca se eliminan físicamente.
    await this.prisma.provider.update({ where: { id }, data: { deletedAt: new Date() } });
    await this.audit.write({
      actorId: user.id,
      action: 'DELETE',
      entityType: 'Provider',
      entityId: id,
      payload: { name: provider.name },
      tenantId: user.tenantId,
    });
  }
}
