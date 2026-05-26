import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { PROVIDER_REPOSITORY, type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';

@Injectable()
export class ToggleActiveProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY) private readonly providers: ProviderRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    active: boolean,
    actorId: string,
    tenantId: string | null,
  ): Promise<Provider> {
    const provider = await this.providers.findById(id);
    if (!provider) throw new NotFoundError('Provider', id);
    if (active) provider.activate();
    else provider.deactivate();
    const saved = await this.providers.save(provider);
    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'Provider',
      entityId: saved.id,
      payload: { active: saved.active },
      tenantId,
    });
    return saved;
  }
}
