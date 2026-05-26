import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { ConflictError } from '@/common/exceptions/domain.exception';
import { PROVIDER_REPOSITORY, type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
import type { RegisterProviderInput } from './dto/provider-input';

@Injectable()
export class RegisterProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY) private readonly providers: ProviderRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    input: RegisterProviderInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Provider> {
    if (input.taxId) {
      const existing = await this.providers.findByTaxId(input.taxId);
      if (existing) {
        throw new ConflictError(
          'TAX_ID_TAKEN',
          `Ya existe un proveedor con el CUIT/RUT ${input.taxId}`,
        );
      }
    }
    const provider = await this.providers.create({ ...input, tenantId });
    await this.audit.write({
      actorId,
      action: 'CREATE',
      entityType: 'Provider',
      entityId: provider.id,
      payload: { name: provider.name, serviceType: provider.serviceType },
      tenantId,
    });
    return provider;
  }
}
