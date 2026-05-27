import { CreateProviderUseCase } from '../../application/use-cases/create-provider/create-provider.use-case';
import { CreateProviderRequestDto } from '../dtos/create-provider.request.dto';
import { ProviderResponseDto } from '../dtos/provider.response.dto';
export declare class ProvidersController {
    private readonly createProvider;
    constructor(createProvider: CreateProviderUseCase);
    create(dto: CreateProviderRequestDto): Promise<ProviderResponseDto>;
}
