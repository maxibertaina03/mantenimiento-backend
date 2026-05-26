import { Module } from '@nestjs/common';

import { DashboardController } from './presentation/dashboard.controller';
import { GetDashboardStatsUseCase } from './application/get-dashboard-stats.use-case';

@Module({
  controllers: [DashboardController],
  providers: [GetDashboardStatsUseCase],
})
export class DashboardModule {}
