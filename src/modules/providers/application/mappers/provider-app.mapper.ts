import { Provider } from '../../domain/entities/provider.entity';
import { CreateProviderOutput } from '../dtos/create-provider.output';

export class ProviderAppMapper {
  static toOutput(provider: Provider): CreateProviderOutput {
    return {
      id: provider.getId(),
      name: provider.getName(),
      taxId: provider.getTaxId(),
      contactName: provider.getContactName(),
      phone: provider.getPhone(),
      email: provider.getEmail(),
      address: provider.getAddress(),
      serviceType: provider.getServiceType(),
      notes: provider.getNotes(),
      active: provider.isActive(),
      createdAt: provider.getCreatedAt(),
    };
  }
}
