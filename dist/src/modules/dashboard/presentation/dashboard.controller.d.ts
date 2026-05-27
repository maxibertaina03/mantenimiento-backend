import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { GetDashboardStatsUseCase } from '../application/get-dashboard-stats.use-case';
import { DashboardStatsDto } from './dashboard-response.dto';
export declare class DashboardController {
    private readonly statsUC;
    constructor(statsUC: GetDashboardStatsUseCase);
    stats(user: AuthenticatedUser): Promise<DashboardStatsDto>;
}
