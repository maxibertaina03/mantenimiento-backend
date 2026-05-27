import { Provider as PrismaProvider, ProviderServiceType as PrismaProviderServiceType } from '@prisma/client';
import { Provider } from '../../domain/entities/provider.entity';
import { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';

export class PrismaProviderMapper {
  static toDomain(raw: PrismaProvider): Provider {
    return new Provider(
      raw.id,
      raw.name,
      raw.taxId,
      raw.contactName,
      raw.phone,
      raw.email,
      raw.address,
      raw.serviceType as ProviderServiceType,
      raw.notes,
      raw.active,
      raw.tenantId,
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
    );
  }

  static toPersistence(provider: Provider): Omit<PrismaProvider, 'createdAt' | 'updatedAt' | 'deletedAt'> {
    return {
      id: provider.getId(),
      name: provider.getName(),
      taxId: provider.getTaxId(),
      contactName: provider.getContactName(),
      phone: provider.getPhone(),
      email: provider.getEmail(),
      address: provider.getAddress(),
      serviceType: provider.getServiceType() as PrismaProviderServiceType,
      notes: provider.getNotes(),
      active: provider.isActive(),
      tenantId: provider.getTenantId(),
    };
  }
}
