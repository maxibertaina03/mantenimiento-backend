import { IProviderRepository } from '../../../domain/repositories/provider.repository';
import { ListProvidersInput } from '../../dtos/list-providers.input';
import type { CreateProviderOutput } from '../../dtos/create-provider.output';
export interface ListProvidersOutput {
    items: CreateProviderOutput[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListProvidersUseCase {
    private readonly repository;
    constructor(repository: IProviderRepository);
    execute(input: ListProvidersInput): Promise<ListProvidersOutput>;
}
