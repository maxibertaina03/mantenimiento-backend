import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { PROVIDER_REPOSITORY, type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';

@Injectable()
export class GetProviderUseCase {
  constructor(@Inject(PROVIDER_REPOSITORY) private readonly providers: ProviderRepository) {}

  async execute(id: string): Promise<Provider> {
    const p = await this.providers.findById(id);
    if (!p) throw new NotFoundError('Provider', id);
    return p;
  }
}
