import { Inject, Injectable } from '@nestjs/common';
import { PROVIDER_REPOSITORY, type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
import type { ListProvidersInput } from './dto/provider-input';

export interface PaginatedProviders {
  items: Provider[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListProvidersUseCase {
  constructor(@Inject(PROVIDER_REPOSITORY) private readonly providers: ProviderRepository) {}

  async execute(input: ListProvidersInput): Promise<PaginatedProviders> {
    const page = Math.max(1, input.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
    const { items, total } = await this.providers.list({
      skip: (page - 1) * pageSize,
      take: pageSize,
      search: input.search?.trim() || undefined,
      serviceType: input.serviceType,
      active: input.active,
    });
    return { items, total, page, pageSize };
  }
}
