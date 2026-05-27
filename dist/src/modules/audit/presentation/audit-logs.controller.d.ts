import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { ListAuditLogsUseCase } from '../application/list-audit-logs.use-case';
import { ListAuditLogsQueryDto, PaginatedAuditLogsResponseDto } from './audit-logs.dto';
export declare class AuditLogsController {
    private readonly listUC;
    constructor(listUC: ListAuditLogsUseCase);
    list(q: ListAuditLogsQueryDto, user: AuthenticatedUser): Promise<PaginatedAuditLogsResponseDto>;
}
