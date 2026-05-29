import { Injectable, Inject } from '@nestjs/common';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../../domain/repositories/provider.repository';
import { ProviderAppMapper } from '../../mappers/provider-app.mapper';
import { ListProvidersInput } from '../../dtos/list-providers.input';
import type { CreateProviderOutput } from '../../dtos/create-provider.output';

export interface ListProvidersOutput {
  items: CreateProviderOutput[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class ListProvidersUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(input: ListProvidersInput): Promise<ListProvidersOutput> {
    const providers = await this.repository.findAll({
      tenantId: input.tenantId,
      search: input.search,
      serviceType: input.serviceType,
      active: input.active,
    });

    const page = Number(input.page) > 0 ? Number(input.page) : 1;
    const pageSize = Number(input.pageSize) > 0 ? Number(input.pageSize) : 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedProviders = providers.slice(start, end);

    const items = paginatedProviders.map((p) => ProviderAppMapper.toOutput(p));

    return {
      items,
      total: providers.length,
      page,
      pageSize,
    };
  }
}
