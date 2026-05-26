import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';

import { ListAuditLogsUseCase } from '../application/list-audit-logs.use-case';
import {
  AuditLogResponseDto,
  ListAuditLogsQueryDto,
  PaginatedAuditLogsResponseDto,
} from './audit-logs.dto';

@ApiTags('audit-logs')
@ApiBearerAuth('clerk')
@Controller({ path: 'audit-logs', version: '1' })
@Roles('ADMIN', 'SUPERVISOR')
export class AuditLogsController {
  constructor(private readonly listUC: ListAuditLogsUseCase) {}

  @Get()
  @ApiOkResponse({ type: PaginatedAuditLogsResponseDto })
  async list(
    @Query() q: ListAuditLogsQueryDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<PaginatedAuditLogsResponseDto> {
    const result = await this.listUC.execute({ ...q, tenantId: user.tenantId });
    return {
      items: result.items.map(AuditLogResponseDto.from),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
  }
}
