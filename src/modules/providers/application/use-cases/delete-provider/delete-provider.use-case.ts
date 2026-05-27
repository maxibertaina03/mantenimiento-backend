import { Injectable, Inject } from '@nestjs/common';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../domain/repositories/provider.repository';
import { ProviderNotFoundException } from '../../domain/exceptions/provider-not-found.exception';

@Injectable()
export class DeleteProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const provider = await this.repository.findById(id);
    if (!provider) throw new ProviderNotFoundException(id);
    await this.repository.delete(id);
  }
}
