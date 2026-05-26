import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { PROVIDER_REPOSITORY, type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
import type { UpdateProviderInput } from './dto/provider-input';

@Injectable()
export class UpdateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY) private readonly providers: ProviderRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: UpdateProviderInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Provider> {
    const provider = await this.providers.findById(id);
    if (!provider) throw new NotFoundError('Provider', id);
    provider.updateMetadata(input);
    const saved = await this.providers.save(provider);
    await this.audit.write({
      actorId,
      action: 'UPDATE',
      entityType: 'Provider',
      entityId: saved.id,
      payload: input as Record<string, unknown>,
      tenantId,
    });
    return saved;
  }
}
