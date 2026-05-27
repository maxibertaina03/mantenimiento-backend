import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { RegisterProviderUseCase } from '../application/register-provider.use-case';
import { UpdateProviderUseCase } from '../application/update-provider.use-case';
import { ToggleActiveProviderUseCase } from '../application/toggle-active-provider.use-case';
import { ListProvidersUseCase } from '../application/list-providers.use-case';
import { GetProviderUseCase } from '../application/get-provider.use-case';
import { CreateProviderDto, ListProvidersQueryDto, ToggleActiveProviderDto, UpdateProviderDto } from './provider-request.dto';
import { PaginatedProviderResponseDto, ProviderResponseDto } from './provider-response.dto';
import { MaintenanceResponseDto } from '@/modules/maintenance/presentation/maintenance-response.dto';
export declare class ProvidersController {
    private readonly registerUC;
    private readonly updateUC;
    private readonly toggleUC;
    private readonly listUC;
    private readonly getUC;
    private readonly prisma;
    private readonly audit;
    constructor(registerUC: RegisterProviderUseCase, updateUC: UpdateProviderUseCase, toggleUC: ToggleActiveProviderUseCase, listUC: ListProvidersUseCase, getUC: GetProviderUseCase, prisma: PrismaService, audit: AuditWriter);
    list(q: ListProvidersQueryDto): Promise<PaginatedProviderResponseDto>;
    get(id: string): Promise<ProviderResponseDto>;
    history(id: string, page?: number, pageSize?: number): Promise<MaintenanceResponseDto[]>;
    create(dto: CreateProviderDto, user: AuthenticatedUser): Promise<ProviderResponseDto>;
    update(id: string, dto: UpdateProviderDto, user: AuthenticatedUser): Promise<ProviderResponseDto>;
    toggle(id: string, dto: ToggleActiveProviderDto, user: AuthenticatedUser): Promise<ProviderResponseDto>;
    remove(id: string, user: AuthenticatedUser): Promise<void>;
}
