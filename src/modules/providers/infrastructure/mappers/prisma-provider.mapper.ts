import { Provider as PrismaProvider } from '@prisma/client';
import { Provider } from '../../domain/entities/provider.entity';
import { ProviderStatus } from '../../domain/value-objects/provider-status.vo';

export class PrismaProviderMapper {
  static toDomain(raw: PrismaProvider): Provider {
    return new Provider(
      raw.id,
      raw.name,
      raw.email,
      raw.phone,
      raw.address,
      raw.city,
      raw.postalCode,
      raw.country,
      raw.taxId,
      raw.status as ProviderStatus,
      raw.tenantId,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(provider: Provider): Omit<PrismaProvider, 'createdAt' | 'updatedAt'> {
    return {
      id: provider.getId(),
      name: provider.getName(),
      email: provider.getEmail(),
      phone: provider.getPhone(),
      address: provider.getAddress(),
      city: provider.getCity(),
      postalCode: provider.getPostalCode(),
      country: provider.getCountry(),
      taxId: provider.getTaxId(),
      status: provider.getStatus(),
      tenantId: provider.getTenantId(),
    };
  }
}
