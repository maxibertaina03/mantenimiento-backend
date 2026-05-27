import { type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
import type { ListProvidersInput } from './dto/provider-input';
export interface PaginatedProviders {
    items: Provider[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListProvidersUseCase {
    private readonly providers;
    constructor(providers: ProviderRepository);
    execute(input: ListProvidersInput): Promise<PaginatedProviders>;
}
