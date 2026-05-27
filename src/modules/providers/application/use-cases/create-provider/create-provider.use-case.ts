import { Injectable, Inject } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { Provider } from '../../domain/entities/provider.entity';
import { IProviderRepository, PROVIDER_REPOSITORY } from '../../domain/repositories/provider.repository';
import { ProviderStatus } from '../../domain/value-objects/provider-status.vo';
import { InvalidProviderException } from '../../domain/exceptions/invalid-provider.exception';
import { CreateProviderInput } from '../../application/dtos/create-provider.input';
import { CreateProviderOutput } from '../../application/dtos/create-provider.output';
import { ProviderAppMapper } from '../mappers/provider-app.mapper';

@Injectable()
export class CreateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly repository: IProviderRepository,
  ) {}

  async execute(input: CreateProviderInput): Promise<CreateProviderOutput> {
    // 1. Crear entidad de dominio
    const provider = new Provider(
      generateUUID(),
      input.name,
      input.email ?? null,
      input.phone ?? null,
      input.address ?? null,
      input.city ?? null,
      input.postalCode ?? null,
      input.country ?? null,
      input.taxId ?? null,
      ProviderStatus.ACTIVE,
      null, // tenantId
    );

    // 2. Validar invariantes de negocio
    const existingProvider = await this.repository.findByName(provider.getName());
    if (existingProvider) {
      throw new InvalidProviderException(`Provider with name "${provider.getName()}" already exists`);
    }

    // 3. Persistir
    await this.repository.save(provider);

    // 4. Retornar DTO de salida
    return ProviderAppMapper.toOutput(provider);
  }
}
