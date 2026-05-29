import { Injectable, Inject } from '@nestjs/common';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../../domain/repositories/provider.repository';
import { ProviderNotFoundException } from '../../../domain/exceptions/provider-not-found.exception';
import { CreateProviderOutput } from '../../dtos/create-provider.output';
import { ProviderAppMapper } from '../../mappers/provider-app.mapper';

export class UpdateProviderInput {
  id!: string;
  name?: string;
  contactName?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

@Injectable()
export class UpdateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(input: UpdateProviderInput): Promise<CreateProviderOutput> {
    const provider = await this.repository.findById(input.id);
    if (!provider) throw new ProviderNotFoundException(input.id);

    if (input.name) provider.changeName(input.name);
    if (input.contactName !== undefined || input.phone !== undefined || input.email !== undefined || input.address !== undefined) {
      provider.updateContactInfo(input.contactName, input.phone, input.email, input.address);
    }

    await this.repository.save(provider);
    return ProviderAppMapper.toOutput(provider);
  }
}
