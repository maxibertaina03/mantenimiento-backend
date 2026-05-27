import { CreateProviderOutput } from '../../application/dtos/create-provider.output';
import { ProviderResponseDto } from '../dtos/provider.response.dto';

export class ProviderPresenterMapper {
  static toResponse(output: CreateProviderOutput): ProviderResponseDto {
    return {
      id: output.id,
      name: output.name,
      email: output.email,
      phone: output.phone,
      address: output.address,
      city: output.city,
      postalCode: output.postalCode,
      country: output.country,
      taxId: output.taxId,
      status: output.status,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }
}
