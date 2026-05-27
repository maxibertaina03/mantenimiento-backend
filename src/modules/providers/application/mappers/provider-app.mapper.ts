import { Provider } from '../../domain/entities/provider.entity';
import { CreateProviderOutput } from '../dtos/create-provider.output';

export class ProviderAppMapper {
  static toOutput(provider: Provider): CreateProviderOutput {
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
      createdAt: provider.getCreatedAt(),
    };
  }
}
