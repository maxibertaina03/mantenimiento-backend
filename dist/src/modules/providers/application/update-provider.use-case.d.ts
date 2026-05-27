import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
import type { UpdateProviderInput } from './dto/provider-input';
export declare class UpdateProviderUseCase {
    private readonly providers;
    private readonly audit;
    constructor(providers: ProviderRepository, audit: AuditWriter);
    execute(id: string, input: UpdateProviderInput, actorId: string, tenantId: string | null): Promise<Provider>;
}
