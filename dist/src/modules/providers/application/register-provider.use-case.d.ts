import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
import type { RegisterProviderInput } from './dto/provider-input';
export declare class RegisterProviderUseCase {
    private readonly providers;
    private readonly audit;
    constructor(providers: ProviderRepository, audit: AuditWriter);
    execute(input: RegisterProviderInput, actorId: string, tenantId: string | null): Promise<Provider>;
}
