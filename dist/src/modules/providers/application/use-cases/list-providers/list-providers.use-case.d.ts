import { IProviderRepository } from '../../../domain/repositories/provider.repository';
import { ListProvidersInput } from '../../dtos/list-providers.input';
import { ListProvidersOutput } from '../../dtos/list-providers.output';
export declare class ListProvidersUseCase {
    private readonly repository;
    constructor(repository: IProviderRepository);
    execute(input: ListProvidersInput): Promise<ListProvidersOutput>;
}
