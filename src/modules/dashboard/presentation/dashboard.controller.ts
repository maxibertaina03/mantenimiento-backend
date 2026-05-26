import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { GetDashboardStatsUseCase } from '../application/get-dashboard-stats.use-case';
import { DashboardStatsDto } from './dashboard-response.dto';

@ApiTags('dashboard')
@ApiBearerAuth('clerk')
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(private readonly statsUC: GetDashboardStatsUseCase) {}

  @Get('stats')
  @ApiOkResponse({ type: DashboardStatsDto })
  async stats(@CurrentUser() user: AuthenticatedUser): Promise<DashboardStatsDto> {
    return this.statsUC.execute(user.tenantId);
  }
}
