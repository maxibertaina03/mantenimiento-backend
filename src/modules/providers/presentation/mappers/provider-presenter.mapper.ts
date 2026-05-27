import { CreateProviderOutput } from '../../application/dtos/create-provider.output';
import { ProviderResponseDto } from '../dtos/provider.response.dto';

export class ProviderPresenterMapper {
  static toResponse(output: CreateProviderOutput): ProviderResponseDto {
    return {
      id: output.id,
      name: output.name,
      taxId: output.taxId,
      contactName: output.contactName,
      phone: output.phone,
      email: output.email,
      address: output.address,
      serviceType: output.serviceType,
      notes: output.notes,
      active: output.active,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }
}
