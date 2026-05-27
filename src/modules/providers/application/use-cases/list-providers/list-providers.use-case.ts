import { Injectable, Inject } from '@nestjs/common';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../domain/repositories/provider.repository';
import { ListProvidersInput } from '../dtos/list-providers.input';
import { ListProvidersOutput, ProviderListItemDto } from '../dtos/list-providers.output';

@Injectable()
export class ListProvidersUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(input: ListProvidersInput): Promise<ListProvidersOutput> {
    const providers = await this.repository.findAll(input.tenantId);

    const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
    const end = start + (input.pageSize ?? 10);
    const paginatedProviders = providers.slice(start, end);

    const items: ProviderListItemDto[] = paginatedProviders.map((p) => ({
      id: p.getId(),
      name: p.getName(),
      contactName: p.getContactName(),
      phone: p.getPhone(),
      email: p.getEmail(),
      serviceType: p.getServiceType(),
      active: p.isActive(),
      createdAt: p.getCreatedAt(),
    }));

    return {
      items,
      total: providers.length,
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 10,
    };
  }
}
