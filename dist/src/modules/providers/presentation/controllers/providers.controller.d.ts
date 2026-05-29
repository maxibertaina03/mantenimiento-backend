import { CreateProviderUseCase } from '../../application/use-cases/create-provider/create-provider.use-case';
import { ListProvidersUseCase } from '../../application/use-cases/list-providers/list-providers.use-case';
import { GetProviderUseCase } from '../../application/use-cases/get-provider/get-provider.use-case';
import { UpdateProviderUseCase } from '../../application/use-cases/update-provider/update-provider.use-case';
import { DeleteProviderUseCase } from '../../application/use-cases/delete-provider/delete-provider.use-case';
import { CreateProviderRequestDto } from '../dtos/create-provider.request.dto';
import { UpdateProviderRequestDto } from '../dtos/update-provider.request.dto';
import { ProviderResponseDto } from '../dtos/provider.response.dto';
export declare class ProvidersController {
    private readonly createProvider;
    private readonly listProviders;
    private readonly getProvider;
    private readonly updateProvider;
    private readonly deleteProvider;
    constructor(createProvider: CreateProviderUseCase, listProviders: ListProvidersUseCase, getProvider: GetProviderUseCase, updateProvider: UpdateProviderUseCase, deleteProvider: DeleteProviderUseCase);
    create(dto: CreateProviderRequestDto): Promise<ProviderResponseDto>;
    list(tenantId: string, page?: number, pageSize?: number, _search?: string, _serviceType?: string, _active?: string): Promise<{
        items: ProviderResponseDto[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    get(id: string): Promise<ProviderResponseDto>;
    update(id: string, dto: UpdateProviderRequestDto): Promise<ProviderResponseDto>;
    delete(id: string): Promise<void>;
}
