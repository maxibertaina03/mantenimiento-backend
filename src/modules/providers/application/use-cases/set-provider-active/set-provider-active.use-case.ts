import { Inject, Injectable } from '@nestjs/common';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../../domain/repositories/provider.repository';
import { ProviderNotFoundException } from '../../../domain/exceptions/provider-not-found.exception';
import { ProviderAppMapper } from '../../mappers/provider-app.mapper';
import type { CreateProviderOutput } from '../../dtos/create-provider.output';

export interface SetProviderActiveInput {
  id: string;
  active: boolean;
}

@Injectable()
export class SetProviderActiveUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY) private readonly repository: IProviderRepository,
  ) {}

  async execute(input: SetProviderActiveInput): Promise<CreateProviderOutput> {
    const provider = await this.repository.findById(input.id);
    if (!provider) throw new ProviderNotFoundException(input.id);

    if (input.active) provider.activate();
    else provider.deactivate();

    await this.repository.save(provider);
    return ProviderAppMapper.toOutput(provider);
  }
}
