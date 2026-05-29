import { Injectable, Inject } from '@nestjs/common';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../../domain/repositories/provider.repository';
import { ProviderNotFoundException } from '../../../domain/exceptions/provider-not-found.exception';
import { CreateProviderOutput } from '../../dtos/create-provider.output';
import { ProviderAppMapper } from '../../mappers/provider-app.mapper';

@Injectable()
export class GetProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(id: string): Promise<CreateProviderOutput> {
    const provider = await this.repository.findById(id);
    if (!provider) throw new ProviderNotFoundException(id);
    return ProviderAppMapper.toOutput(provider);
  }
}
