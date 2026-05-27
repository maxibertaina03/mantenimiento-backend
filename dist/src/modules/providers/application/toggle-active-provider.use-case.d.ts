import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
export declare class ToggleActiveProviderUseCase {
    private readonly providers;
    private readonly audit;
    constructor(providers: ProviderRepository, audit: AuditWriter);
    execute(id: string, active: boolean, actorId: string, tenantId: string | null): Promise<Provider>;
}
